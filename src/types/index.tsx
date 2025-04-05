export interface FileItem {
    file: File;
    type: 'image' | 'pdf';
    url: string;
  }
  
  export interface UploadAreaProps {
    isDragging: boolean;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    setUploadType: (type: 'all' | 'images' | 'pdf') => void;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export interface FileListProps {
    files: FileItem[];
    removeFile: (index: number) => void;
    handlePdfClick: (url: string) => void;
  }
  
  export interface PDFViewerProps {
    selectedPdf: string | null;
    currentPage: number;
    numPages: number;
    selectedPages: Set<number>;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
    onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
    selectAllPages: () => void;
    clearSelection: () => void;
    togglePageSelection: (pageNumber: number) => void;
  }