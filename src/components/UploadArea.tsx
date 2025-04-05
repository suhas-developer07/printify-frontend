import React from 'react';
import { ImagePlus, FileText } from 'lucide-react';
import { UploadAreaProps } from '../types';

export function UploadArea({ isDragging, onDragOver, onDragLeave, onDrop, setUploadType, handleFileUpload }: UploadAreaProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <label 
        htmlFor="image-upload"
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragging ? 'border-purple-400 bg-purple-50' : 'border-purple-200 bg-white hover:border-purple-400 hover:bg-purple-50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => {
          setUploadType('images');
          onDrop(e);
        }}
      >
        <ImagePlus className="w-8 h-8 text-purple-500 mb-2" />
        <span className="text-sm font-medium text-purple-700">Upload Images</span>
        <span className="text-xs text-purple-500 mt-1">Drop images here or click to browse</span>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => {
            setUploadType('images');
            handleFileUpload(e);
          }}
        />
      </label>

      <label 
        htmlFor="pdf-upload"
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragging ? 'border-indigo-400 bg-indigo-50' : 'border-indigo-200 bg-white hover:border-indigo-400 hover:bg-indigo-50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => {
          setUploadType('pdf');
          onDrop(e);
        }}
      >
        <FileText className="w-8 h-8 text-indigo-500 mb-2" />
        <span className="text-sm font-medium text-indigo-700">Upload PDFs</span>
        <span className="text-xs text-indigo-500 mt-1">Drop PDFs here or click to browse</span>
        <input
          id="pdf-upload"
          type="file"
          className="hidden"
          multiple
          accept=".pdf"
          onChange={(e) => {
            setUploadType('pdf');
            handleFileUpload(e);
          }}
        />
      </label>
    </div>
  );
}