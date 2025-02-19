'use client';

import { SVGS } from '@crowdcareaid-frontend/assets';
import Image from 'next/image';
import { ChangeEvent, useEffect } from 'react';

interface ImageUploaderProps {
  images: { url: string; file: File }[];
  setImages: (arg: { url: string; file: File }[]) => void;
}

export function ImageUploader({ images, setImages }: ImageUploaderProps) {
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-row justify-between items-center p-8 w-full">
      <div className="w-1/5">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelection}
          className="hidden"
          id="image-input"
          multiple
        />
        <label htmlFor="image-input">
          <div className="cursor-pointer">
            <SVGS.UploadButton />
          </div>
        </label>
      </div>
      <div className="flex flex-col items-center p-8 w-4/5 border border-black rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image.url}
                alt={`Selected ${index + 1}`}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 cursor-pointer"
              >
                <SVGS.DeleteIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
