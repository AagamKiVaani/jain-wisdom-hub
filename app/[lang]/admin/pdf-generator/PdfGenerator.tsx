"use client";

import React, { useState } from "react";
import { Upload, FileDown, Trash2, Link as LinkIcon } from "lucide-react";
import { jsPDF } from "jspdf";

const ICONS = {
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.1C2.6 6.3 3.2 5.7 4 5.6C5.9 5.3 12 5.3 12 5.3s6.1 0 8 .3c.8.1 1.4.7 1.5 1.5.3 1.9.3 4.9.3 4.9s0 3-.3 4.9c-.1.8-.7 1.4-1.5 1.5-1.9.3-8 .3-8 .3s-6.1 0-8-.3c-.8-.1-1.4-.7-1.5-1.5-.3-1.9-.3-4.9-.3-4.9s0-3 .3-4.9z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`
};

export default function PdfGenerator() {
  const [images, setImages] = useState<File[]>([]);
  const [websitePath, setWebsitePath] = useState("/resources");
  const [watermarkText, setWatermarkText] = useState("AAGAM KI VAANI");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.10);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const loadLogoBase64 = async (): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = "/icons/logo.png";
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.arc(img.width / 2, img.height / 2, img.width / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } else {
          resolve("");
        }
      };
      img.onerror = () => resolve("");
    });
  };

  const svgToDataUrl = async (svgString: string, color: string): Promise<string> => {
    let coloredSvg = svgString.replace('stroke="currentColor"', `stroke="${color}"`);
    coloredSvg = coloredSvg.replace('fill="currentColor"', `fill="${color}"`);
    const blob = new Blob([coloredSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 64, 64);
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve("");
        }
        URL.revokeObjectURL(url);
      };
      img.onerror = () => resolve("");
      img.src = url;
    });
  };

  const applyWatermark = (file: File): Promise<{ dataUrl: string, width: number, height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve({ dataUrl: img.src, width: img.width, height: img.height });

        ctx.drawImage(img, 0, 0);

        // Robust single Watermark styling
        const fontSize = Math.floor(canvas.width / 8); // Very large for a single stamp
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = `rgba(100, 100, 100, ${watermarkOpacity})`; 
        ctx.shadowColor = `rgba(255, 255, 255, ${Math.min(1, watermarkOpacity * 2)})`; 
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((-35 * Math.PI) / 180);

        // Display exactly once in the center
        ctx.fillText(watermarkText, 0, 0);

        resolve({ dataUrl: canvas.toDataURL("image/jpeg", 0.9), width: canvas.width, height: canvas.height });
      };
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const logoBase64 = await loadLogoBase64();
      
      // Load social icons
      const brandColor = "#D97706";
      const ytIcon = await svgToDataUrl(ICONS.youtube, brandColor);
      const fbIcon = await svgToDataUrl(ICONS.facebook, brandColor);
      const igIcon = await svgToDataUrl(ICONS.instagram, brandColor);
      const wpIcon = await svgToDataUrl(ICONS.whatsapp, brandColor);

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const centerX = 595.28 / 2;

        // Premium Borders
        pdf.setDrawColor(217, 119, 6); // Amber-600
        pdf.setLineWidth(1.5);
        pdf.rect(20, 20, 555, 802); // Outer
        pdf.setLineWidth(0.5);
        pdf.rect(24, 24, 547, 794); // Inner

        // Elegant Header
        if (logoBase64) {
          pdf.addImage(logoBase64, "PNG", centerX - 25, 35, 50, 50);
        }
        
        pdf.setFont("times", "normal");
        pdf.setFontSize(28);
        pdf.setTextColor(180, 83, 9);
        const title = "Aagam Ki Vaani";
        const titleW = pdf.getTextWidth(title);
        const titleY = 115;
        pdf.text(title, centerX - (titleW / 2), titleY);

        pdf.setDrawColor(217, 119, 6);
        pdf.setLineWidth(0.5);
        pdf.line(centerX - (titleW / 2) - 30, titleY - 8, centerX - (titleW / 2) - 10, titleY - 8);
        pdf.line(centerX + (titleW / 2) + 10, titleY - 8, centerX + (titleW / 2) + 30, titleY - 8);

        // Separator
        pdf.setDrawColor(217, 119, 6);
        pdf.setLineWidth(1);
        pdf.line(160, 135, 435, 135);

        // Dynamic Links Area (No Emojis)
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(14);
        
        // Hardcoded production URL instead of localhost
        const websiteBaseUrl = "https://jain-wisdom-hub.vercel.app/en";
        const fullWebsiteUrl = `${websiteBaseUrl}${websitePath.startsWith('/') ? websitePath : '/' + websitePath}`;
        
        const part1 = "Read more notes at: ";
        const part2 = "Jain Wisdom Hub";
        
        pdf.setTextColor(80, 80, 80);
        const p1W = pdf.getTextWidth(part1);
        
        pdf.setFont("helvetica", "bold");
        const p2W = pdf.getTextWidth(part2);
        
        const totalW = p1W + p2W;
        const startX = centerX - (totalW / 2);
        const linkY = 160;
        
        pdf.setFont("helvetica", "italic");
        pdf.text(part1, startX, linkY);
        
        pdf.setTextColor(37, 99, 235);
        pdf.setFont("helvetica", "bold");
        pdf.text(part2, startX + p1W, linkY);
        
        pdf.link(startX + p1W, linkY - 14, p2W, 18, { url: fullWebsiteUrl });
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(1);
        pdf.line(startX + p1W, linkY + 2, startX + p1W + p2W, linkY + 2);

        // Watermark and Image Draw
        const { dataUrl, width, height } = await applyWatermark(images[i]);
        
        const maxImgWidth = 470; 
        const maxImgHeight = 550; 
        
        let finalWidth = maxImgWidth;
        let finalHeight = (height * maxImgWidth) / width;
        
        if (finalHeight > maxImgHeight) {
          finalHeight = maxImgHeight;
          finalWidth = (width * maxImgHeight) / height;
        }
        
        const imgXOffset = centerX - (finalWidth / 2);
        const imgYOffset = 180 + (maxImgHeight - finalHeight) / 2;
        pdf.addImage(dataUrl, "JPEG", imgXOffset, imgYOffset, finalWidth, finalHeight);

        // Icon-Only Footer Layout
        const footerY = 770;
        const iconSize = 22;
        const spacing = 24;

        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(10);
        pdf.setTextColor(120, 120, 120);
        const connectText = "Click on the icons below to connect:";
        const connectW = pdf.getTextWidth(connectText);
        pdf.text(connectText, centerX - (connectW / 2), footerY - 12);
        
        const socials = [
          { icon: ytIcon, url: "https://www.youtube.com/@aagamkivaani" },
          { icon: fbIcon, url: "https://www.facebook.com/share/18FUyhp5Pd/" },
          { icon: igIcon, url: "https://www.instagram.com/aagamkivaani/" },
          { icon: wpIcon, url: "https://whatsapp.com/channel/0029Vb6orXyCXC3TTIu0n43j" }
        ];

        const totalFooterWidth = (socials.length * iconSize) + ((socials.length - 1) * spacing);
        let currentX = centerX - (totalFooterWidth / 2);

        socials.forEach((social) => {
          if (social.icon) {
            pdf.addImage(social.icon, "PNG", currentX, footerY, iconSize, iconSize);
            pdf.link(currentX, footerY, iconSize, iconSize, { url: social.url });
          }
          currentX += iconSize + spacing;
        });
      }

      pdf.save("Aagam-Ki-Vaani-Notes.pdf");
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-gray-100 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            Premium PDF Generator
          </h1>
          <p className="text-gray-400">Upload notes, add watermarks, and generate branded PDFs for YouTube Shorts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5 text-orange-400" /> Upload Images
            </h2>
            
            <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-8 hover:bg-gray-800 transition-colors text-center cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <Upload className="w-8 h-8 text-gray-500" />
                <p className="text-sm font-medium text-gray-300">Drag & drop or click to upload</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Jain Wisdom Hub Path
                </label>
                <input
                  type="text"
                  value={websitePath}
                  onChange={e => setWebsitePath(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  placeholder="/learn/my-topic"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Watermark Text</label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={e => setWatermarkText(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center justify-between">
                  <span>Watermark Visibility</span>
                  <span className="text-orange-400 font-mono">{Math.round(watermarkOpacity * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={watermarkOpacity}
                  onChange={e => setWatermarkOpacity(parseFloat(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={images.length === 0 || isGenerating}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                images.length === 0 ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg"
              }`}
            >
              <FileDown className="w-5 h-5" />
              {isGenerating ? "Generating PDF..." : `Generate Premium PDF (${images.length} pages)`}
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">Preview ({images.length} files)</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {images.length === 0 && (
                <div className="text-center text-gray-500 py-12">No images uploaded yet.</div>
              )}
              {images.map((img, idx) => (
                <div key={idx} className="relative group bg-gray-950 rounded-lg p-2 border border-gray-800 flex items-center gap-4">
                  <span className="font-mono text-gray-500 text-sm ml-2">{(idx + 1).toString().padStart(2, '0')}</span>
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="truncate text-sm flex-1">{img.name}</span>
                  <button
                    onClick={() => removeImage(idx)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
