
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import ImageUploader from './components/ImageUploader';
import StockModelSelector from './components/StockModelSelector';
import NeonInput from './components/NeonInput';
import DropdownSelector from './components/DropdownSelector';
import Button from './components/Button';
import Loader from './components/Loader';
import { PRESETS, ASPECT_RATIOS } from './constants';
import type { Preset, AspectRatio } from './types';
import { generatePhotoshootImage } from './services/geminiService';
import { InfoIcon, DownloadIcon } from './components/Icons';

const App: React.FC = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!modelImage || !productImage) {
      setError('Please upload both a model and a product image.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generatePhotoshootImage(
        modelImage,
        productImage,
        prompt,
        preset.prompt,
        aspectRatio.value
      );
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [modelImage, productImage, prompt, preset, aspectRatio]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'brandpixo-photoshoot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0a0a1a] min-h-screen text-gray-200 font-sans">
      <ParticleBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Control Panel */}
          <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.1)] flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-cyan-300 tracking-wide">Studio Controls</h2>
            
            {/* Image Uploaders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploader title="1. Upload Model" onImageUpload={setModelImage} />
              <ImageUploader title="2. Upload Product" onImageUpload={setProductImage} />
            </div>
            
            <StockModelSelector onSelectModel={setModelImage} />
            
            {/* Smart Prompt */}
            <div>
              <label className="text-lg font-semibold mb-2 block text-gray-300">3. Creative Instructions</label>
              <NeonInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., model holding the product, looking happy..."
              />
            </div>
            
            {/* Presets and Aspect Ratio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-lg font-semibold mb-2 block text-gray-300">4. Style Preset</label>
                <DropdownSelector<Preset>
                  options={PRESETS}
                  selected={preset}
                  onChange={setPreset}
                  getLabel={(option) => option.name}
                />
              </div>
              <div>
                <label className="text-lg font-semibold mb-2 block text-gray-300">5. Image Size</label>
                <DropdownSelector<AspectRatio>
                  options={ASPECT_RATIOS}
                  selected={aspectRatio}
                  onChange={setAspectRatio}
                  getLabel={(option) => option.label}
                />
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isLoading || !modelImage || !productImage}>
              {isLoading ? 'Generating...' : 'Generate Photoshoot'}
            </Button>

            {error && <p className="text-red-400 text-center">{error}</p>}
          </div>

          {/* Output Section */}
          <div className="bg-black/30 backdrop-blur-sm border border-fuchsia-500/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(255,0,255,0.1)] min-h-[500px] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-fuchsia-300 tracking-wide mb-4">Generated Output</h2>
            {isLoading && <Loader />}
            {!isLoading && !generatedImage && (
              <div className="text-center text-gray-400 flex flex-col items-center gap-4">
                <InfoIcon className="w-12 h-12" />
                <p>Your AI-generated product photoshoot will appear here.</p>
                <p className="text-sm">Configure your settings and click "Generate" to begin.</p>
              </div>
            )}
            {generatedImage && !isLoading && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div>
                    <h3 className="text-center mb-2 font-semibold text-gray-300">Original Product</h3>
                    <img src={productImage!} alt="Original Product" className="rounded-lg w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-center mb-2 font-semibold text-gray-300">AI Generated</h3>
                    <img src={generatedImage} alt="Generated Photoshoot" className="rounded-lg w-full object-contain" />
                  </div>
                </div>
                <Button onClick={handleDownload} className="mt-4 bg-fuchsia-500 hover:bg-fuchsia-600 shadow-fuchsia-500/50">
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
