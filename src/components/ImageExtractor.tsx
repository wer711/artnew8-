import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

export function ImageExtractor() {
  const [colors, setColors] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImgUrl(url);

    const img = new Image();
    img.onload = () => {
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
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    try {
      const data = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
      const extracted = new Set<string>();
      const step = Math.floor(data.length / 20) * 4; // Sample points
      
      for (let i = 0; i < data.length; i += step) {
        if (data[i+3] < 128) continue; // Transparency
        const hex = '#' + [data[i], data[i+1], data[i+2]]
          .map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        extracted.add(hex);
        if (extracted.size >= 5) break;
      }
      setColors(Array.from(extracted));
    } catch (e) {
      alert("Could not extract colors (CORS/taint error)");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="image-extractor">
      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-sage/15">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[3px] uppercase text-sage font-medium mb-3">
            ✦ Extract Colors from Any Photo
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-4">
            Upload a Photo → Get <em className="italic text-rose">Paper Colors</em>
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
              <canvas ref={canvasRef} className="rounded-xl shadow-lg max-w-full max-h-[300px]" />
              <button onClick={() => { setImgUrl(null); setColors([]); }} className="absolute -top-3 -right-3 bg-rose text-white rounded-full p-1.5 shadow-md">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <button onClick={extract} className="w-full py-3 rounded-xl bg-gradient-to-br from-rose to-deep text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5">
               Extract Colors
              </button>
              
              {colors.length > 0 && (
                <div className="bg-rose/5 rounded-xl p-4 border border-rose/10 mt-4 h-full">
                  <h4 className="text-xs font-semibold text-deep mb-3 uppercase tracking-wider">Extracted Palette</h4>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((c, i) => (
                      <div key={i} className="flex-1 min-w-[50px] h-16 rounded-lg shadow-sm flex items-end justify-center pb-2 cursor-pointer hover:-translate-y-1 transition-transform" style={{backgroundColor: c}}>
                        <span className="text-[9px] text-white bg-black/30 px-1 rounded backdrop-blur-sm">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
