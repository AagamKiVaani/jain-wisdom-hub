import { NextRequest, NextResponse } from "next/server";

// Extract clean Google Drive File ID from various formats
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

// Sanitize filename for Content-Disposition header
function sanitizeFilename(title: string | null): string {
  if (!title || !title.trim()) return "Jain-Wisdom-Notes.pdf";
  // Replace invalid characters for filenames
  const clean = title.trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, "").replace(/\s+/g, "_");
  return clean.toLowerCase().endsWith(".pdf") ? clean : `${clean}.pdf`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawId = searchParams.get("id");
    const rawTitle = searchParams.get("title");

    if (!rawId) {
      return NextResponse.json({ error: "Missing file ID" }, { status: 400 });
    }

    const filename = sanitizeFilename(rawTitle);
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

    // Fetch the file from source with redirect following
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

    // If Google Drive returned an HTML confirmation page (virus warning for larger files)
    if (contentType.includes("text/html")) {
      const htmlText = await response.text();
      // Look for confirm token in download link
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
          const encodedFilename = encodeURIComponent(filename);
          return new Response(secondResponse.body, {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
              "Cache-Control": "public, max-age=86400, s-maxage=86400",
            },
          });
        }
      }
      // If we couldn't parse the file, redirect to drive directly as safe fallback
      return NextResponse.redirect(targetUrl);
    }

    if (!response.body) {
      return NextResponse.json({ error: "Empty response body" }, { status: 502 });
    }

    const encodedFilename = encodeURIComponent(filename);
    const headers = new Headers();
    headers.set("Content-Type", contentType.includes("pdf") ? "application/pdf" : (contentType || "application/pdf"));
    headers.set(
      "Content-Disposition",
      `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`
    );
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");

    const contentLength = response.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Stream the PDF directly to client with attachment headers
    return new Response(response.body, {
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
