// // src/pdf-worker.js
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).href;

// pdfWorker.js
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// Asegúrate de usar la ruta correcta para la versión 4.8.69
GlobalWorkerOptions.workerSrc = 
  process.env.NODE_ENV === 'production'
    ? `${process.env.PUBLIC_URL}/pdf.worker.min.js`
    : new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString();