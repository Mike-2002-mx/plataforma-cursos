import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.js`;

export default function PdfViewer({ pdfUrl }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setIsLoading(false);
    }
  
    function changePage(offset) {
      const newPageNumber = pageNumber + offset;
      if (newPageNumber >= 1 && newPageNumber <= numPages) {
        setPageNumber(newPageNumber);
      }
    }
  
    function previousPage() {
      changePage(-1);
    }
  
    function nextPage() {
      changePage(1);
    }
  
    function zoomIn() {
      setScale(scale + 0.1);
    }
  
    function zoomOut() {
      if (scale > 0.5) {
        setScale(scale - 0.1);
      }
    }
  
    function rotateLeft() {
      setRotation((rotation - 90) % 360);
    }
  
    function rotateRight() {
      setRotation((rotation + 90) % 360);
    }
  
    return (
      <div className="pdf-viewer">
        <div className="pdf-controls">
          <div className="navigation-controls">
            <button onClick={previousPage} disabled={pageNumber <= 1}>
              Anterior
            </button>
            <span>
              Página {pageNumber} de {numPages || '--'}
            </span>
            <button onClick={nextPage} disabled={pageNumber >= numPages}>
              Siguiente
            </button>
          </div>
  
          <div className="zoom-controls">
            <button onClick={zoomOut}>-</button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn}>+</button>
          </div>
  
          <div className="rotation-controls">
            <button onClick={rotateLeft}>↺</button>
            <button onClick={rotateRight}>↻</button>
          </div>
  
          <div className="search-controls">
            <input
              type="text"
              placeholder="Buscar en el documento"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
  
        <div className="pdf-container">
          {isLoading && <div className="loading">Cargando PDF...</div>}
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error("Error al cargar el PDF:", error);
              setIsLoading(false);
            }}
            loading={<div className="loading">Cargando PDF...</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    );
}
