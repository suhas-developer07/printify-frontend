import React from 'react';
import { Upload, File, Image, X } from 'lucide-react';
import { FileListProps } from '../types';

export function FileList({ files, removeFile, handlePdfClick }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Upload className="w-12 h-12 mx-auto mb-3 text-purple-300" />
        <p className="text-sm">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {files.map((file, index) => (
        <div
          key={index}
          className="relative bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-purple-100"
        >
          <button
            onClick={() => removeFile(index)}
            className="absolute top-2 right-2 p-1.5 bg-red-50 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => file.type === 'pdf' && handlePdfClick(file.url)}
          >
            {file.type === 'pdf' ? (
              <File className="w-8 h-8 text-purple-500" />
            ) : (
              <Image className="w-8 h-8 text-emerald-500" />
            )}
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.file.name}
              </p>
              <p className="text-sm text-gray-500">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}