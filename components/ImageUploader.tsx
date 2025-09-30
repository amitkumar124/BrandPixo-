
import React, { useState, useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  title: string;
  onImageUpload: (base64: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-gray-300 text-center">{title}</h3>
      <div
        onClick={handleClick}
        className="w-full h-48 border-2 border-dashed border-cyan-500/50 rounded-lg flex justify-center items-center cursor-pointer bg-black/20 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all duration-300"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg p-1" />
        ) : (
          <div className="text-center text-gray-400">
            <UploadIcon className="w-8 h-8 mx-auto mb-2" />
            <p>Click to upload</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
