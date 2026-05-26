import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

export function Calculator() {
  const [matCost, setMatCost] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [shipPack, setShipPack] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const mc = parseFloat(matCost) || 0;
    const th = parseFloat(timeHours) || 0;
    const hr = parseFloat(hourlyRate) || 0;
    const sp = parseFloat(shipPack) || 0;
    
    const total = mc + (th * hr) + sp;
    if (total <= 0) return alert('Enter costs');

    const fixed = 0.45, varRate = 0.095;
    const minP = (total + fixed) / (1 - varRate);
    const sugP = minP * 1.35;
    const fees = 0.20 + (sugP * 0.065) + (sugP * 0.03) + 0.25;
    const net = sugP - total - fees;
    const margin = (net / sugP) * 100;

    setResults({
      minP,
      sugP,
      fees,
      net,
      margin,
      totalCost: total
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="calculator">
      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-rose/10">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-sage/10 text-sage mb-3">
            <CalcIcon size={24} />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Production Cost & Profit Calculator</h2>
          <p className="text-xs text-muted mt-2">Etsy fees (6.5% transaction + 3% + $0.25 processing + $0.20 listing) calculated automatically</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Material Cost ($)</label>
            <input type="number" value={matCost} onChange={e => setMatCost(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 8" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Time Spent (hours)</label>
            <input type="number" value={timeHours} onChange={e => setTimeHours(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 2.5" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Your Hourly Rate ($)</label>
            <input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 15" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Shipping & Packaging ($)</label>
            <input type="number" value={shipPack} onChange={e => setShipPack(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 5" />
          </div>
        </div>

        <button onClick={calculate} className="w-full py-3.5 rounded-xl bg-gradient-to-br from-sage to-[#6b8e5e] text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5">
          Calculate My Minimum Price & Profit
        </button>

        {results && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 text-center">
            <div className="bg-gradient-to-br from-sage/10 to-rose/5 rounded-2xl p-6 mb-4">
              <p className="text-sm text-muted mb-2">Minimum Etsy price to break even: ${results.minP.toFixed(2)}</p>
              <div className="font-serif text-5xl font-semibold text-sage">${results.net.toFixed(2)}</div>
              <div className="text-xs text-muted mt-2">Net Profit at Suggested Price</div>
              <div className="text-lg font-semibold text-rose mt-3">Suggested Price: ${results.sugP.toFixed(2)}</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">${results.totalCost.toFixed(2)}</div>
                <div className="text-[10px] text-muted">Your Total Cost</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">${results.fees.toFixed(2)}</div>
                <div className="text-[10px] text-muted">Etsy Fees</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">{results.margin.toFixed(1)}%</div>
                <div className="text-[10px] text-muted">Profit Margin</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">${(results.net * 10).toFixed(0)}</div>
                <div className="text-[10px] text-muted">If 10 sales/mo</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
