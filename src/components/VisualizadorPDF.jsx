import '../pdf-worker';
import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const VisualizadoPDF = ({pdfUrl}) =>{
    const [numPages, setNumPages] = useState(null);


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return(
        <>
            <div className="contenedor_pdf">  
                <span>Páginas {numPages || '--'}</span>
            </div>
            <div className="pdf-container">
                <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
                >
                    <Page
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                    />
                </Document>
            </div>
        </>
    )
}
export default VisualizadoPDF;