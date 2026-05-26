import React, { useRef, useState } from 'react';
import { Upload, X, Share2, Sparkles } from 'lucide-react';
import { useDailyLimit } from '../hooks/useDailyLimit';
import { NextStep } from './NextStep';

function colorDistance(hex1: string, hex2: string) {
  const r1 = parseInt(hex1.substring(1, 3), 16);
  const g1 = parseInt(hex1.substring(3, 5), 16);
  const b1 = parseInt(hex1.substring(5, 7), 16);
  const r2 = parseInt(hex2.substring(1, 3), 16);
  const g2 = parseInt(hex2.substring(3, 5), 16);
  const b2 = parseInt(hex2.substring(5, 7), 16);
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

export function ImageExtractor() {
  const { incrementUsage } = useDailyLimit();
  const [colors, setColors] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [colorCount, setColorCount] = useState<number>(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!incrementUsage()) return; // Daily limit check

    const url = URL.createObjectURL(file);
    setImgUrl(url);

    const img = new Image();
    img.onload = () => {
      setOriginalImage(img);
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;
      
      const sc = Math.min(400 / img.width, 300 / img.height, 1);
      cvs.width = img.width * sc;
      cvs.height = img.height * sc;
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
    };
    img.src = url;
  };

  const extract = () => {
    if (!originalImage) return;

    if (!incrementUsage()) return; // Daily limit check

    const extractCanvas = document.createElement('canvas');
    // Using a higher resolution limit to capture detailed colors
    let scale = 1;
    if (originalImage.width > 2000 || originalImage.height > 2000) {
      scale = Math.min(2000 / originalImage.width, 2000 / originalImage.height);
    }
    extractCanvas.width = originalImage.width * scale;
    extractCanvas.height = originalImage.height * scale;
    
    const exCtx = extractCanvas.getContext('2d', { willReadFrequently: true });
    if (!exCtx) return;
    exCtx.drawImage(originalImage, 0, 0, extractCanvas.width, extractCanvas.height);

    try {
      const data = exCtx.getImageData(0, 0, extractCanvas.width, extractCanvas.height).data;
      const colorCounts = new Map<string, number>();
      
      // We will skip fewer pixels to ensure small details are caught
      for (let i = 0; i < data.length; i += 4) {
        if (data[i+3] < 200) continue; 
        
        // Finer quantization for catching subtle differences
        const quantize = colorCount > 10 ? 16 : 24; 
        const r = Math.round(data[i] / quantize) * quantize;
        const g = Math.round(data[i+1] / quantize) * quantize;
        const b = Math.round(data[i+2] / quantize) * quantize;
        
        const hex = '#' + [r, g, b]
          .map(x => Math.min(255, Math.max(0, x)).toString(16).padStart(2, '0')).join('').toUpperCase();
        
        colorCounts.set(hex, (colorCounts.get(hex) || 0) + 1);
      }
      
      const sorted = Array.from(colorCounts.entries()).sort((a, b) => b[1] - a[1]);
      
      const selected: string[] = [];
      const threshold = colorCount > 10 ? 30 : 50;
      
      for (const [hex, _count] of sorted) {
        if (selected.length >= colorCount) break;
        let tooClose = false;
        for (const s of selected) {
          if (colorDistance(hex, s) < threshold) { 
            tooClose = true; 
            break; 
          }
        }
        if (!tooClose) {
          selected.push(hex);
        }
      }
      
      setColors(selected);
    } catch (e) {
      alert("Could not extract colors (CORS/taint error)");
    }
  };

  const downloadCSV = () => {
    if (colors.length === 0) return;
    const csv = "Hex Color\\n" + colors.join("\\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_colors.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    if (colors.length === 0) return;
    const blob = new Blob([JSON.stringify({ colors }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_colors.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (colors.length === 0) return;
    const cols = Math.min(colors.length, 6);
    const rows = Math.ceil(colors.length / cols);
    const swatchW = 100;
    const swatchH = 100;
    
    const c = document.createElement('canvas');
    c.width = cols * swatchW;
    c.height = rows * swatchH;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, c.width, c.height);
    
    colors.forEach((hex, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      ctx.fillStyle = hex;
      ctx.fillRect(col * swatchW, row * swatchH, swatchW, swatchH - 30);
      
      ctx.fillStyle = '#000000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(hex, col * swatchW + swatchW / 2, row * swatchH + swatchH - 10);
    });
    
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = 'extracted_colors.png';
    a.click();
  };


  const sharePalette = async () => {
    if (colors.length === 0) return;
    const text = `🎨 Check out this color palette I extracted using ArtNew8:\\n${colors.join(', ')}\\n\\nGenerate yours for free at ArtNew8! ✨`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ArtNew8 Color Palette',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Palette copied to clipboard! Share it with your friends.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-5 mb-16" id="image-extractor">
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-sage/10 relative overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[3px] uppercase text-sage font-medium mb-3">
            ✦ Found a Photo You Love?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-4">
            Upload & Extract <em className="italic text-rose">Palette</em>
          </h2>
        </div>

        {!imgUrl ? (
          <div className="border-2 border-dashed border-rose/30 rounded-2xl p-12 text-center hover:bg-rose/5 transition-colors relative cursor-pointer">
            <input type="file" onChange={handleFile} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
            <Upload className="mx-auto text-rose/50 mb-4" size={48} />
            <p className="text-sm font-medium text-ink">Drag & drop an image here</p>
            <p className="text-xs text-muted mt-2">100% private, processed in your browser</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 relative">
              <canvas ref={canvasRef} className="rounded-xl shadow-md max-w-full w-auto object-contain max-h-[300px] md:max-h-[400px]" />
              <button onClick={() => { setImgUrl(null); setColors([]); }} className="absolute -top-3 -right-3 bg-rose text-white rounded-full p-1.5 shadow-md hover:scale-110 transition-transform">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-4 items-center mb-2">
                <label className="text-xs font-semibold text-muted">Number of colors:</label>
                <select 
                  value={colorCount} 
                  onChange={e => setColorCount(parseInt(e.target.value, 10))}
                  className="p-2 border border-rose/15 rounded-lg text-sm flex-1 bg-white outline-none focus:border-rose transition-colors"
                >
                  <option value={6}>Top 6 Colors (Dominant)</option>
                  <option value={12}>12 Colors (Detailed)</option>
                  <option value={24}>24 Colors (All Details)</option>
                </select>
              </div>
              <button onClick={extract} className="w-full py-3 rounded-xl bg-gradient-to-br from-rose to-deep text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5">
               Extract Colors
              </button>
              
              {colors.length > 0 && (
                <div className="bg-rose/5 rounded-xl p-4 border border-rose/10 mt-2 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-semibold text-deep uppercase tracking-wider">Extracted Palette</h4>
                    <div className="flex gap-2">
                      <button onClick={sharePalette} className="text-[10px] text-white bg-gradient-to-r from-rose to-gold px-2 py-1 rounded shadow-sm hover:shadow-md transition-all flex items-center gap-1 font-medium"><Share2 size={12}/> Share</button>
                      <button onClick={downloadPNG} className="text-[10px] text-rose bg-white border border-rose/20 px-2 py-1 rounded hover:bg-rose hover:text-white transition-colors">PNG</button>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap max-h-48 overflow-y-auto pr-1 pb-2">
                    {colors.map((c, i) => (
                      <div key={i} className="flex-1 min-w-[45px] max-w-[70px] h-14 rounded-lg shadow-sm flex items-end justify-center pb-1.5 cursor-pointer hover:-translate-y-1 transition-transform" style={{backgroundColor: c}}>
                        <span className="text-[8px] text-white bg-black/40 px-1 rounded backdrop-blur-sm tracking-wider">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
