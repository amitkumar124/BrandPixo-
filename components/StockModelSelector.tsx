
import React, { useState } from 'react';
import { STOCK_MODELS } from '../constants';
import type { StockModel } from '../types';

interface StockModelSelectorProps {
  onSelectModel: (base64: string) => void;
}

const StockModelSelector: React.FC<StockModelSelectorProps> = ({ onSelectModel }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = async (model: StockModel) => {
    setSelectedId(model.id);
    try {
        const response = await fetch(model.url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            onSelectModel(reader.result as string);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error("Error fetching or converting stock image:", error);
    }
  };

  return (
    <div>
        <h3 className="text-center font-semibold text-gray-300 mb-2">Or select a stock model</h3>
        <div className="grid grid-cols-4 gap-2">
            {STOCK_MODELS.map(model => (
                <div key={model.id} className="relative">
                    <img 
                        src={model.url}
                        alt={model.alt}
                        onClick={() => handleSelect(model)}
                        className={`w-full h-full object-cover rounded-md cursor-pointer transition-all duration-200 ${selectedId === model.id ? 'ring-2 ring-fuchsia-400' : 'hover:opacity-80'}`}
                    />
                </div>
            ))}
        </div>
    </div>
  );
};

export default StockModelSelector;
