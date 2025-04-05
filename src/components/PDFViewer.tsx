import React from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, FileText } from 'lucide-react';
import { PDFViewerProps } from '../types';

export function PDFViewer({ 
  selectedPdf,
  currentPage,
  numPages,
  selectedPages,
  setCurrentPage,
  onDocumentLoadSuccess,
  selectAllPages,
  clearSelection,
  togglePageSelection 
}: PDFViewerProps) {
  if (!selectedPdf) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <FileText className="w-16 h-16 text-purple-200 mb-4" />
        <h3 className="text-xl font-semibold text-purple-900 mb-2">No PDF Selected</h3>
        <p className="text-sm text-purple-500 max-w-sm">
          Upload a PDF file and click on it to preview and select pages
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-900">PDF Preview</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg hover:bg-purple-50 disabled:opacity-50 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-purple-600" />
          </button>
          <span className="text-sm font-medium text-purple-900">
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
            disabled={currentPage >= numPages}
            className="p-2 rounded-lg hover:bg-purple-50 disabled:opacity-50 transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={selectAllPages}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200"
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Select All
        </button>
        <button
          onClick={clearSelection}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
        >
          <XCircle className="w-4 h-4 mr-1" />
          Clear Selection
        </button>
      </div>
      
      <div className="overflow-hidden rounded-lg border border-purple-100">
        <Document
          file={selectedPdf}
          onLoadSuccess={onDocumentLoadSuccess}
          className="max-w-full"
        >
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-sm"
            width={Math.min(window.innerWidth - 48, 595)}
          />
        </Document>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-900">
            Selected Pages: {Array.from(selectedPages).sort((a, b) => a - b).join(', ') || 'None'}
          </span>
          <button
            onClick={() => togglePageSelection(currentPage)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedPages.has(currentPage)
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {selectedPages.has(currentPage) ? 'Deselect' : 'Select'} Current Page
          </button>
        </div>
      </div>
    </div>
  );
}