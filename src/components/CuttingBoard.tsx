import React, { useRef, useState } from 'react';
import { Scissors, Download, Image as ImageIcon, Share2 } from 'lucide-react';
import { useDailyLimit } from '../hooks/useDailyLimit';
import { NextStep } from './NextStep';

export function CuttingBoard() {
  const { incrementUsage } = useDailyLimit();
  const [sheetW, setSheetW] = useState('12');
  const [sheetH, setSheetH] = useState('12');
  const [pieceW, setPieceW] = useState('3.5');
  const [pieceH, setPieceH] = useState('5');
  const [qty, setQty] = useState('24');
  const [bladeGap, setBladeGap] = useState('0.1');
  const [margin, setMargin] = useState('0.25');
  
  const [stats, setStats] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const calculate = () => {
    if (!incrementUsage()) return; // Daily limit check

    const sw = parseFloat(sheetW);
    const sh = parseFloat(sheetH);
    const pw = parseFloat(pieceW);
    const ph = parseFloat(pieceH);
    const count = parseInt(qty, 10);
    const gap = parseFloat(bladeGap) || 0;
    const m = parseFloat(margin) || 0;

    if (!sw || !sh || !pw || !ph || !count) return;

    let useW = sw - 2 * m;
    let useH = sh - 2 * m;
    if (useW < 0) useW = 0;
    if (useH < 0) useH = 0;

    if (pw > useW && pw > useH) return alert('Piece is larger than workable area');
    if (ph > useH && ph > useW) return alert('Piece is larger than workable area');

    const getCount = (blockW: number, blockH: number, pieceW: number, pieceH: number) => {
      blockW = Math.max(0, blockW);
      blockH = Math.max(0, blockH);
      if (blockW < pieceW - 0.0001 || blockH < pieceH - 0.0001) return { c: 0, r: 0, n: 0 };
      const c = Math.floor((blockW + gap + 0.0001) / (pieceW + gap));
      const r = Math.floor((blockH + gap + 0.0001) / (pieceH + gap));
      return { c, r, w: pieceW, h: pieceH, n: c*r };
    };

    let maxPiecesPerSheet = 0;
    let bestLayout: any = null;

    for (const [w1, h1, w2, h2] of [[pw, ph, ph, pw], [ph, pw, pw, ph]]) {
      const maxC = getCount(useW, useH, w1, h1).c;
      const maxR = getCount(useW, useH, w1, h1).r;
      
      for (let r = 0; r <= maxR; r++) {
        for (let c = 0; c <= maxC; c++) {
          const b1 = { c, r, n: c*r };
          
          const rightV_W = useW - c * (w1 + gap);
          const rightV_H = useH;
          const b2V = getCount(rightV_W, rightV_H, w2, h2);
          
          const topV_W = c === 0 ? 0 : c * (w1 + gap) - gap;
          const topV_H = useH - r * (h1 + gap);
          const b3V = getCount(topV_W, topV_H, w2, h2);

          const totalV = b1.n + b2V.n + b3V.n;

          if (totalV > maxPiecesPerSheet) {
            maxPiecesPerSheet = totalV;
            bestLayout = {
              type: 'V', w1, h1, w2, h2,
              b1: { ...b1, w: w1, h: h1, x: 0, y: 0 },
              b2: { ...b2V, w: w2, h: h2, x: c * (w1 + gap), y: 0 },
              b3: { ...b3V, w: w2, h: h2, x: 0, y: r * (h1 + gap) }
            };
          }

          const topH_W = useW;
          const topH_H = useH - r * (h1 + gap);
          const b2H = getCount(topH_W, topH_H, w2, h2);

          const rightH_W = useW - c * (w1 + gap);
          const rightH_H = r === 0 ? 0 : r * (h1 + gap) - gap;
          const b3H = getCount(rightH_W, rightH_H, w2, h2);

          const totalH = b1.n + b2H.n + b3H.n;

          if (totalH > maxPiecesPerSheet) {
            maxPiecesPerSheet = totalH;
            bestLayout = {
              type: 'H', w1, h1, w2, h2,
              b1: { ...b1, w: w1, h: h1, x: 0, y: 0 },
              b2: { ...b2H, w: w2, h: h2, x: 0, y: r * (h1 + gap) },
              b3: { ...b3H, w: w2, h: h2, x: c * (w1 + gap), y: 0 }
            };
          }
        }
      }
    }

    if (maxPiecesPerSheet === 0) return alert('Piece is too large for sheet');

    const sheets = Math.ceil(count / maxPiecesPerSheet);
    const totalArea = sw * sh * sheets;
    const usedArea = pw * ph * count;
    const eff = Math.round((usedArea / totalArea) * 100);

    const rects: any[] = [];
    let drawn = 0;
    
    if (bestLayout) {
      const addBlock = (b: any) => {
        for (let r = 0; r < b.r; r++) {
          for (let c = 0; c < b.c; c++) {
            drawn++;
            const rx = m + b.x + c * (b.w + gap);
            const ry = m + b.y + r * (b.h + gap);
            rects.push({
              x: rx, y: ry, w: b.w, h: b.h, 
              n: drawn, 
              used: drawn <= count
            });
          }
        }
      };
      addBlock(bestLayout.b1);
      addBlock(bestLayout.b2);
      addBlock(bestLayout.b3);
    }

    setStats({ 
      sw, sh, m, gap,
      perSheet: maxPiecesPerSheet, 
      sheets, eff, extra: (sheets * maxPiecesPerSheet) - count,
      rects
    });
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cutting_layout.svg';
    a.click();
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const bBox = svgRef.current.getBoundingClientRect();
    const scale = 3; 
    canvas.width = bBox.width * scale;
    canvas.height = bBox.height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cutting_layout.png';
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const shareLayout = async () => {
    if (!stats) return;
    const text = `✂️ I just calculated an optimized cutting layout using ArtNew8:\\n${stats.sheets} sheets needed with ${stats.eff}% paper efficiency!\\n\\nCalculate yours for free at ArtNew8! ✨`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ArtNew8 Cutting Layout',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Layout text copied to clipboard! Share it with your friends.");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white sm:bg-warm sm:rounded-3xl sm:p-6 sm:border border-sage/10 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-sage/10 text-sage mb-3">
            <Scissors size={24} />
          </div>
          <p className="text-sm text-muted">A professional guillotine-optimized layout algorithm reflecting real-world paper crafting (with blades/kerf gaps).</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Blade Kerf / Gap</label>
            <input type="number" step="0.05" value={bladeGap} onChange={e => setBladeGap(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Edge Margin</label>
            <input type="number" step="0.05" value={margin} onChange={e => setMargin(e.target.value)} className="w-full p-2.5 border border-sage/20 rounded-lg text-sm bg-white" />
          </div>
        </div>

        <button onClick={calculate} className="w-full py-3.5 rounded-xl bg-gradient-to-br from-sage to-[#5a8a52] text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5 mb-6">
          Calculate Optimized Layout
        </button>

        {stats && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.perSheet}</div><div className="text-[10px] text-muted">Pieces / Sheet</div></div>
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.sheets}</div><div className="text-[10px] text-muted">Sheets Needed</div></div>
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.eff}%</div><div className="text-[10px] text-muted">Paper Efficiency</div></div>
              <div className="bg-sage/5 p-3 rounded-xl text-center"><div className="text-xl font-bold text-sage">{stats.extra}</div><div className="text-[10px] text-muted">Extra Spare Pieces</div></div>
            </div>
          
            <div className="bg-white p-6 rounded-2xl border border-sage/10 text-center flex flex-col items-center overflow-auto shadow-sm">
              <div className="flex flex-wrap gap-3 mb-6 w-full justify-center">
                <button onClick={shareLayout} className="text-xs font-medium text-white bg-gradient-to-r from-sage to-[#5a8a52] px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"><Share2 size={14}/> Share Stats</button>
                <button onClick={downloadSVG} className="text-xs font-medium text-sage bg-sage/10 border border-sage/20 px-4 py-2 rounded-lg hover:bg-sage hover:text-white transition-colors flex items-center gap-2"><Download size={14}/> Download SVG</button>
                <button onClick={downloadPNG} className="text-xs font-medium text-sage bg-sage/10 border border-sage/20 px-4 py-2 rounded-lg hover:bg-sage hover:text-white transition-colors flex items-center gap-2"><ImageIcon size={14}/> Download PNG</button>
              </div>
              
              <svg 
                ref={svgRef}
                width="100%" 
                viewBox={`0 0 ${stats.sw * 10} ${stats.sh * 10}`} 
                style={{ maxWidth: '600px', backgroundColor: '#f9fafb' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="0" width={stats.sw * 10} height={stats.sh * 10} fill="white" stroke="#CBD5E1" strokeWidth="2" />
                
                {stats.m > 0 && (
                   <rect 
                     x={stats.m * 10} y={stats.m * 10} 
                     width={(stats.sw - 2 * stats.m) * 10} 
                     height={(stats.sh - 2 * stats.m) * 10} 
                     fill="none" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="4,4" 
                   />
                )}

                {stats.rects.map((r: any, i: number) => (
                  <g key={i} transform={`translate(${r.x * 10}, ${r.y * 10})`}>
                    <rect 
                      x="0" y="0" 
                      width={r.w * 10} height={r.h * 10} 
                      fill={r.used ? "#E2E8F0" : "#F1F5F9"} 
                      stroke="#94A3B8" strokeWidth="1"
                    />
                    <text 
                      x={r.w * 5} y={r.h * 5} 
                      fill="#475569" 
                      fontSize={Math.max(4, Math.min(r.w * 2.5, 12))} 
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      textAnchor="middle" dominantBaseline="middle"
                    >
                      {r.used ? r.n : `+${r.n - parseFloat(qty)}`}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
