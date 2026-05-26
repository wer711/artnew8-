import React, { useState } from 'react';
import { Calculator as CalcIcon, Share2 } from 'lucide-react';
import { useDailyLimit } from '../hooks/useDailyLimit';
import { NextStep } from './NextStep';

export function Calculator() {
  const { incrementUsage } = useDailyLimit();
  const [platform, setPlatform] = useState('etsy');
  const [matCost, setMatCost] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [shipPack, setShipPack] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    if (!incrementUsage()) return;

    const mc = parseFloat(matCost) || 0;
    const th = parseFloat(timeHours) || 0;
    const hr = parseFloat(hourlyRate) || 0;
    const sp = parseFloat(shipPack) || 0;
    
    const total = mc + (th * hr) + sp;
    if (total <= 0) return alert('Enter costs');

    let fixed = 0;
    let varRate = 0;
    
    if (platform === 'etsy') {
        fixed = 0.45; // 0.20 listing + 0.25 payment processing
        varRate = 0.095; // 6.5% transaction + 3% payment processing
    } else if (platform === 'shopify') {
        fixed = 0.30;
        varRate = 0.029;
    } else if (platform === 'craft_fair') {
        fixed = 0.10; // Square terminal
        varRate = 0.026;
    }

    const minP = (total + fixed) / (1 - varRate);
    const sugP = minP * (platform === 'craft_fair' ? 1.25 : 1.35); // Less margin needed in person
    const fees = fixed + (sugP * varRate);
    const net = sugP - total - fees;
    const margin = (net / sugP) * 100;

    let feeText = "";
    if (platform === 'etsy') feeText = "Etsy Fees (6.5% + 3% + 0.45)";
    if (platform === 'shopify') feeText = "Shopify Fees (2.9% + 0.30)";
    if (platform === 'craft_fair') feeText = "Square POS Fees (2.6% + 0.10)";

    setResults({
      minP,
      sugP,
      fees,
      net,
      margin,
      totalCost: total,
      feeText
    });
  };

  const shareStats = async () => {
    if (!results) return;
    const text = `💰 Just calculated my craft pricing for ${platform} on ArtNew8!\nSuggested Price: $${results.sugP.toFixed(2)}\nProfit Margin: ${results.margin.toFixed(1)}%\n\nCalculate yours for free to avoid selling at a loss! ✨`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ArtNew8 Craft Pricing',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Text copied to clipboard! Share it with your friends.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="calculator">
      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-rose/10">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-sage/10 text-sage mb-3">
            <CalcIcon size={24} />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Production Cost & Profit Calculator</h2>
          <p className="text-xs text-muted mt-2">Automatically calculates marketplace selling fees to guarantee your profit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-muted mb-1">Selling Channel</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white">
                <option value="etsy">Etsy</option>
                <option value="shopify">Shopify</option>
                <option value="craft_fair">Craft Fair (Square)</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-muted mb-1">Material Cost ($)</label>
            <input type="number" value={matCost} onChange={e => setMatCost(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 8" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-muted mb-1">Time Spent (hrs)</label>
            <input type="number" value={timeHours} onChange={e => setTimeHours(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 2.5" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-muted mb-1">Hourly Rate ($)</label>
            <input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 15" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-muted mb-1">Shipping Pack ($)</label>
            <input type="number" value={shipPack} onChange={e => setShipPack(e.target.value)} className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white" placeholder="e.g. 5" />
          </div>
        </div>

        <button onClick={calculate} className="w-full py-3.5 rounded-xl bg-gradient-to-br from-sage to-[#6b8e5e] text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5">
          Calculate My Minimum Price & Profit
        </button>

        {results && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 text-center">
            <div className="bg-gradient-to-br from-sage/10 to-rose/5 rounded-2xl p-6 mb-4 relative">
              <button onClick={shareStats} className="absolute top-4 right-4 text-[10px] text-white bg-gradient-to-r from-sage to-[#5a8a52] px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1 font-medium z-10"><Share2 size={12}/> Share</button>
              <p className="text-sm text-muted mb-2">Minimum breaking even price on {platform === 'craft_fair' ? 'Square' : platform === 'etsy' ? 'Etsy' : 'Shopify'}: ${results.minP.toFixed(2)}</p>
              <div className="font-serif text-5xl font-semibold text-sage">${results.net.toFixed(2)}</div>
              <div className="text-xs text-muted mt-2">Net Profit at Suggested Price</div>
              <div className="text-lg font-semibold text-rose mt-3">Suggested Selling Price: ${results.sugP.toFixed(2)}</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">${results.totalCost.toFixed(2)}</div>
                <div className="text-[10px] text-muted">Total Crafting/Shipping Cost</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose/5 cursor-help" title={results.feeText}>
                <div className="text-xl font-semibold text-deep">${results.fees.toFixed(2)}</div>
                <div className="text-[10px] text-muted line-clamp-1">{results.feeText}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">{results.margin.toFixed(1)}%</div>
                <div className="text-[10px] text-muted">Profit Margin</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose/5">
                <div className="text-xl font-semibold text-deep">${(results.net * 10).toFixed(0)}</div>
                <div className="text-[10px] text-muted">Monthly Proj. (10 sales/mo)</div>
              </div>
            </div>
            
            <NextStep 
              title="Plan Your Sales & Posts"
              description="Now that you have your pricing sorted, schedule when to make and post your products on social media using the Content Calendar."
              targetId="calendar"
              icon="calendar"
            />
          </div>
        )}
      </div>
    </section>
  );
}
