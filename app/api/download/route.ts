import { NextRequest, NextResponse } from "next/server";

// Extract clean Google Drive File ID from various formats (URL or raw ID)
function extractDriveId(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();

  // Pattern: /file/d/([a-zA-Z0-9_-]+)
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) return matchFileD[1];

  // Pattern: id=([a-zA-Z0-9_-]+)
  const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) return matchIdParam[1];

  // If it doesn't contain slashes or dots, it's already a raw ID
  if (!trimmed.includes("/") && !trimmed.includes(".")) {
    return trimmed;
  }

  return trimmed;
}

// Extract exact filename from Google Drive Content-Disposition header
function extractFilenameFromDisposition(disposition: string | null): string | null {
  if (!disposition) return null;

  // 1. Try RFC 5987 / 6266: filename*=UTF-8''filename.ext
  const matchUtf8 = disposition.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
  if (matchUtf8 && matchUtf8[1]) {
    try {
      const decoded = decodeURIComponent(matchUtf8[1].trim().replace(/^["']|["']$/g, ""));
      if (decoded) return sanitizeFilename(decoded);
    } catch {
      return sanitizeFilename(matchUtf8[1].trim().replace(/^["']|["']$/g, ""));
    }
  }

  // 2. Try standard: filename="filename.ext" or filename=filename.ext
  const matchRegular = disposition.match(/filename="?([^";\n]+)"?/i);
  if (matchRegular && matchRegular[1]) {
    const name = matchRegular[1].trim().replace(/^["']|["']$/g, "");
    if (name) return sanitizeFilename(name);
  }

  return null;
}

// Sanitize filename for safe file system saving
function sanitizeFilename(title: string | null): string {
  if (!title || !title.trim()) return "Jain-Wisdom-Notes.pdf";
  // Clean invalid characters
  const clean = title.trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, "");
  return clean.toLowerCase().endsWith(".pdf") ? clean : `${clean}.pdf`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawId = searchParams.get("id");
    const rawTitle = searchParams.get("title");
    const series = searchParams.get("series");
    const section = searchParams.get("section");

    if (!rawId) {
      return NextResponse.json({ error: "Missing file ID" }, { status: 400 });
    }

    const driveId = extractDriveId(rawId);

    // Determine target download URL
    let targetUrl: string;
    if (rawId.startsWith("http://") || rawId.startsWith("https://")) {
      if (rawId.includes("drive.google.com")) {
        targetUrl = `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`;
      } else {
        targetUrl = rawId; // Direct non-drive link
      }
    } else {
      targetUrl = `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`;
    }

    // Fetch the file from Google Drive with redirect following
    const response = await fetch(targetUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Source responded with status ${response.status}` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    let finalBody: ReadableStream<Uint8Array> | null = response.body;
    let driveFilename: string | null = extractFilenameFromDisposition(response.headers.get("content-disposition"));

    // If Google Drive returned an HTML confirmation page (e.g. virus warning for large files)
    if (contentType.includes("text/html")) {
      const htmlText = await response.text();
      const confirmMatch = htmlText.match(/confirm=([a-zA-Z0-9_-]+)/);
      if (confirmMatch && confirmMatch[1]) {
        const confirmUrl = `https://drive.google.com/uc?export=download&id=${driveId}&confirm=${confirmMatch[1]}`;
        const secondResponse = await fetch(confirmUrl, {
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });

        if (secondResponse.ok && secondResponse.body) {
          finalBody = secondResponse.body;
          driveFilename = extractFilenameFromDisposition(secondResponse.headers.get("content-disposition"));
        }
      }
    }

    if (!finalBody) {
      return NextResponse.json({ error: "Empty response body" }, { status: 502 });
    }

    // Determine the most accurate filename:
    // 1. Google Drive's exact filename if available
    // 2. Or a rich fallback: Series - Section - Title
    let resolvedFilename = driveFilename;
    if (!resolvedFilename) {
      const parts = [series, section, rawTitle].filter(Boolean);
      resolvedFilename = parts.length > 0 ? sanitizeFilename(parts.join(" - ")) : sanitizeFilename(rawTitle);
    }

    const encodedFilename = encodeURIComponent(resolvedFilename);
    const headers = new Headers();
    headers.set("Content-Type", contentType.includes("pdf") ? "application/pdf" : (contentType || "application/pdf"));
    headers.set(
      "Content-Disposition",
      `attachment; filename="${resolvedFilename}"; filename*=UTF-8''${encodedFilename}`
    );
    headers.set("Access-Control-Expose-Headers", "Content-Disposition, X-File-Name");
    headers.set("X-File-Name", encodedFilename);
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");

    const contentLength = response.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Stream the PDF directly to client with attachment headers
    return new Response(finalBody, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Direct PDF download proxy error:", error);
    return NextResponse.json(
      { error: "Download proxy encountered an error", message: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
