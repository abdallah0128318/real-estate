import { useState } from 'react'
// pdfjs uses a web worker to process the most tasks which take time such as parsing and rendering a PDF document. 
// The web worker is loaded via the `workerUrl` parameter
// import the worker and viewer component
import { Worker, Viewer } from '@react-pdf-viewer/core';
// import viewer styles
import '@react-pdf-viewer/core/lib/styles/index.css';

function Home() {
  const [pdfFile, setPdfFile] = useState("./Abdallah-Qapeel-Taha.pdf")
  return (
    <>
    <h1 className='text-4xl font-serif font-bold mt-11 text-center'>Pdf Audio Async</h1>
    <div className='mt-10'>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfFile} />
      </Worker>
    </div>
    </>
)
}

export default Home
