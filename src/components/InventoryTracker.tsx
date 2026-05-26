import React, { useState } from 'react';
import { Archive, Plus, Trash2 } from 'lucide-react';

interface PaperItem {
  color: string;
  name: string;
  brand: string;
  qty: number;
}

export function InventoryTracker() {
  const [inventory, setInventory] = useState<PaperItem[]>([]);
  const [color, setColor] = useState('#D4A373');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Recollections');
  const [qty, setQty] = useState('10');

  const add = () => {
    if (!name) return;
    setInventory([...inventory, { color, name, brand, qty: parseInt(qty)||0 }]);
    setName('');
  };

  const remove = (index: number) => {
    setInventory(inventory.filter((_, i) => i !== index));
  };

  const adjustQty = (index: number, amount: number) => {
    const newInv = [...inventory];
    newInv[index].qty = Math.max(0, newInv[index].qty + amount);
    setInventory(newInv);
  };

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="inventory">
      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-rose/10">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[3px] uppercase text-rose font-medium mb-3">
            ✦ Paper Inventory Tracker
          </p>
          <h2 className="font-serif text-3xl font-light">Track Your Stock</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 bg-white p-3 rounded-xl border border-rose/5 shadow-sm">
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Paper name" className="flex-1 p-2 border border-rose/15 rounded-lg text-sm bg-white" />
          <select value={brand} onChange={e => setBrand(e.target.value)} className="w-32 p-2 border border-rose/15 rounded-lg text-sm bg-white">
            <option>Recollections</option>
            <option>Cardstock Whs</option>
            <option>Other</option>
          </select>
          <input type="number" value={qty} onChange={e => setQty(e.target.value)} className="w-16 p-2 border border-rose/15 rounded-lg text-sm bg-white" />
          <button onClick={add} className="bg-rose text-white p-2 rounded-lg hover:shadow-md transition-shadow"><Plus size={20} /></button>
        </div>

        <div className="space-y-3 max-h-80 overflow-auto pr-2">
          {inventory.length === 0 ? (
            <div className="text-center py-10 text-xs text-muted">No stock logged yet. Add your first color!</div>
          ) : (
            inventory.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 bg-white rounded-xl border ${item.qty < 3 ? 'border-rose/40 bg-rose/5' : 'border-rose/10'}`}>
                <div className="w-8 h-8 rounded-lg shadow-sm" style={{backgroundColor: item.color}} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink line-clamp-1">{item.name}</div>
                  <div className="text-[10px] text-muted">{item.brand}</div>
                </div>
                <div className={`text-sm font-bold w-6 text-center ${item.qty < 3 ? 'text-rose' : 'text-sage'}`}>{item.qty}</div>
                <div className="flex gap-1">
                  <button onClick={() => adjustQty(i, -1)} className="w-7 h-7 flex items-center justify-center border border-rose/20 rounded-md hover:bg-rose/10 transition-colors text-ink">-</button>
                  <button onClick={() => adjustQty(i, 1)} className="w-7 h-7 flex items-center justify-center border border-rose/20 rounded-md hover:bg-rose/10 transition-colors text-ink">+</button>
                  <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center border border-rose/20 rounded-md hover:bg-rose text-muted hover:text-white transition-colors ml-1"><Trash2 size={12} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
