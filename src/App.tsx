/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header, Notice } from './components/Header';
import { Hero } from './components/Hero';
import { Generator } from './components/Generator';
import { Calculator } from './components/Calculator';
import { Library } from './components/Library';
import { ImageExtractor } from './components/ImageExtractor';
import { CuttingBoard } from './components/CuttingBoard';
import { Calendar } from './components/Calendar';
import { InventoryTracker } from './components/InventoryTracker';

export default function App() {
  return (
    <div className="min-h-screen pb-20 font-sans">
      <Header />
      <Hero />
      <div className="my-8" />
      <Generator />
      <ImageExtractor />
      <Library />
      <Notice />
      <Calculator />
      <CuttingBoard />
      <Calendar />
      <InventoryTracker />
    </div>
  );
}
