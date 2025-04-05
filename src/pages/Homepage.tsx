import React, { useState } from 'react';
import { Header } from '../components/Header'
import { UploadArea } from '../components/UploadArea';
import { FileList } from '../components/FileList';
import { PDFViewer } from '../components/PDFViewer';
import { FileItem } from '../types';

// Set up PDF worker
import "../lib/pdfWorkerSetup";
import "../types/pdf-worker.d.ts";



function HomePage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadType, setUploadType] = useState<'all' | 'images' | 'pdf'>('all');
  const [pdfSelections, setPdfSelections] = useState<Record<string, number[]>>({});



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const newFiles: FileItem[] = Array.from(uploadedFiles).map(file => ({
      file,
      type: file.type.startsWith('image/') ? 'image' : 'pdf',
      url: URL.createObjectURL(file)
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: FileItem[] = droppedFiles
      .filter(file => {
        if (uploadType === 'images') return file.type.startsWith('image/');
        if (uploadType === 'pdf') return file.type === 'application/pdf';
        return true;
      })
      .map(file => ({
        file,
        type: file.type.startsWith('image/') ? 'image' : 'pdf',
        url: URL.createObjectURL(file)
      }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].url);
    setFiles(files.filter((_, i) => i !== index));
    if (files[index].url === selectedPdf) {
      setSelectedPdf(null);
      setSelectedPages(new Set());
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const togglePageSelection = (pageNumber: number) => {
    const newSelection = new Set(selectedPages);
    if (newSelection.has(pageNumber)) {
      newSelection.delete(pageNumber);
    } else {
      newSelection.add(pageNumber);
    }
    setSelectedPages(newSelection);
  
    if (selectedPdf) {
      const file = files.find(f => f.url === selectedPdf);
      if (file) {
        setPdfSelections(prev => ({
          ...prev,
          [file.file.name]: Array.from(newSelection).sort((a, b) => a - b)
        }));
  };
}
}

  const selectAllPages = () => {
    const allPages = new Set(Array.from({ length: numPages }, (_, i) => i + 1));
    setSelectedPages(allPages);
  
    if (selectedPdf) {
      const file = files.find(f => f.url === selectedPdf);
      if (file) {
        setPdfSelections(prev => ({
          ...prev,
          [file.file.name]: Array.from(allPages)
        }));
      }
    }
  };

  const clearSelection = () => {
    setSelectedPages(new Set());
    if (selectedPdf) {
      const file = files.find(f => f.url === selectedPdf);
      if (file) {
        setPdfSelections(prev => ({
          ...prev,
          [file.file.name]: []
        }));
      }
    }
   
  };

  const handlePdfClick = (url: string) => {
    setSelectedPdf(url);
    setCurrentPage(1);
    
    const file = files.find(f => f.url === url);
    if (file) {
      const savedPages = pdfSelections[file.file.name] || [];
      setSelectedPages(new Set(savedPages));
    }
  };

  // const updateSelectionData = (updatedSet: Set<number>) => {
  //   if (!selectedPdf) return;
  //   const selectedFile = files.find(f => f.url === selectedPdf);
  //   if (!selectedFile) return;
  
  //   setPdfPageSelectionData({
  //     fileName: selectedFile.file.name,
  //     selectedPages: Array.from(updatedSet).sort((a, b) => a - b),
  //   });
  // };
  

console.log(pdfSelections);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="space-y-8">
            <UploadArea
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              setUploadType={setUploadType}
              handleFileUpload={handleFileUpload}
            />
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h2 className="text-lg font-semibold text-purple-900 mb-4">Uploaded Files</h2>
              <FileList
                files={files}
                removeFile={removeFile}
                handlePdfClick={handlePdfClick}
              />
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 h-full">
              <PDFViewer
                selectedPdf={selectedPdf}
                currentPage={currentPage}
                numPages={numPages}
                selectedPages={selectedPages}
                setCurrentPage={setCurrentPage}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
                selectAllPages={selectAllPages}
                clearSelection={clearSelection}
                togglePageSelection={togglePageSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;