import React, { useRef, useState } from 'react';
import { Scissors } from 'lucide-react';

export function CuttingBoard() {
  const [sheetW, setSheetW] = useState('12');
  const [sheetH, setSheetH] = useState('12');
  const [pieceW, setPieceW] = useState('3.5');
  const [pieceH, setPieceH] = useState('5');
  const [qty, setQty] = useState('24');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState<any>(null);

  const calculate = () => {
    const sw = parseFloat(sheetW);
    const sh = parseFloat(sheetH);
    const pw = parseFloat(pieceW);
    const ph = parseFloat(pieceH);
    const count = parseInt(qty, 10);
    if (!sw || !sh || !pw || !ph || !count) return;

    let cols = Math.floor(sw / pw);
    let rows = Math.floor(sh / ph);
    let perSheet = cols * rows;
    
    // Auto rotation check
    let rotCols = Math.floor(sw / ph);
    let rotRows = Math.floor(sh / pw);
    let rotPerSheet = rotCols * rotRows;
    
    let isRotated = false;
    if (rotPerSheet > perSheet) {
      cols = rotCols;
      rows = rotRows;
      perSheet = rotPerSheet;
      isRotated = true;
    }

    if (perSheet === 0) return alert('Piece is too large for sheet');

    const sheets = Math.ceil(count / perSheet);
    const totalArea = sw * sh * sheets;
    const usedArea = pw * ph * count;
    const eff = Math.round((usedArea / totalArea) * 100);

    setStats({ perSheet, sheets, eff, isRotated, extra: (sheets * perSheet) - count });

    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const scale = Math.min(480 / sw, 380 / sh);
    cvs.width = sw * scale + 40;
    cvs.height = sh * scale + 40;
    
    const ox = 20, oy = 20;
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    ctx.fillStyle = '#fff';
    ctx.fillRect(ox, oy, sw * scale, sh * scale);
    ctx.strokeStyle = '#888';
    ctx.strokeRect(ox, oy, sw * scale, sh * scale);

    const actualPW = isRotated ? ph : pw;
    const actualPH = isRotated ? pw : ph;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = r * cols + c + 1;
        const x = ox + c * actualPW * scale;
        const y = oy + r * actualPH * scale;
        const w = actualPW * scale;
        const h = actualPH * scale;
        
        ctx.fillStyle = n > count ? 'rgba(107,143,113,0.1)' : 'rgba(107,143,113,0.3)';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = 'rgba(107,143,113,0.6)';
        ctx.strokeRect(x, y, w, h);
      }
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="cut-board">
      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-sage/10">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-sage/10 text-sage mb-3">
            <Scissors size={24} />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Zero Waste Cutting Layout</h2>
          <p className="text-xs text-muted mt-2">Get an optimized cutting layout with rotation & cost analysis.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Sheet W (in)</label>
            <input type="number" value={sheetW} onChange={e => setSheetW(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Sheet H (in)</label>
            <input type="number" value={sheetH} onChange={e => setSheetH(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Piece W (in)</label>
            <input type="number" value={pieceW} onChange={e => setPieceW(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Piece H (in)</label>
            <input type="number" value={pieceH} onChange={e => setPieceH(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Total Needed</label>
            <input type="number" value={qty} onChange={e => setQty(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
        </div>

        <button onClick={calculate} className="w-full py-3.5 rounded-xl bg-gradient-to-br from-sage to-[#5a8a52] text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5 mb-6">
          Calculate Optimized Layout
        </button>

        <div className={`transition-opacity duration-500 \${stats ? 'opacity-100' : 'opacity-0 h-0 hidden'}`}>
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.perSheet}</div><div className="text-[10px] text-muted">Pieces/Sheet</div></div>
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.sheets}</div><div className="text-[10px] text-muted">Sheets Needed</div></div>
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.eff}%</div><div className="text-[10px] text-muted">Efficiency</div></div>
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.extra}</div><div className="text-[10px] text-muted">Extra Pieces</div></div>
            </div>
          )}
          
          <div className="bg-white p-4 rounded-2xl border border-sage/10 text-center flex justify-center overflow-auto">
            <canvas ref={canvasRef} className="rounded max-w-full shadow-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
