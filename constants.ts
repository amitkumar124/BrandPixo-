
import type { Preset, AspectRatio, StockModel } from './types';

export const PRESETS: Preset[] = [
  { name: 'Professional Studio', prompt: 'in a clean, professional studio with bright, soft lighting, minimalist background' },
  { name: 'Outdoor Lifestyle', prompt: 'in a vibrant outdoor lifestyle setting, with natural sunlight and a blurred natural background' },
  { name: 'Social Media Aesthetic', prompt: 'with a trendy, vibrant, and eye-catching social media aesthetic, possibly with neon lights or pastel colors' },
  { name: 'E-commerce', prompt: 'on a plain, seamless white or light gray background, perfect for e-commerce listings like Amazon' },
  { name: 'Futuristic Tech', prompt: 'in a futuristic, high-tech environment with sleek surfaces and neon accents' },
  { name: 'Cozy Home', prompt: 'in a warm and cozy home environment, like on a wooden table or next to a fireplace' },
];

export const ASPECT_RATIOS: AspectRatio[] = [
  { label: '1:1 (Square)', value: '1:1' },
  { label: '16:9 (Landscape)', value: '16:9' },
  { label: '9:16 (Portrait)', value: '9:16' },
];

export const STOCK_MODELS: StockModel[] = [
    { id: 1, url: 'https://picsum.photos/id/1005/512/512', alt: 'Woman in field' },
    { id: 2, url: 'https://picsum.photos/id/1011/512/512', alt: 'Woman on boat' },
    { id: 3, url: 'https://picsum.photos/id/433/512/512', alt: 'Man with camera' },
    { id: 4, url: 'https://picsum.photos/id/64/512/512', alt: 'Man with glasses' },
]
