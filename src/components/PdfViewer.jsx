import React from 'react';
import { Document, Page } from "react-pdf";

function PdfViewer({ url }) {
    // url = 'https://pdfobject.com/pdf/sample.pdf'

    return (
        <a href={url} target='_blank' rel="noreferrer noopener">
            <div className='p-6 bg-slate-400 inline-block'>
                <Document file={url} >
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
                <p>Click to view</p>
            </div>
        </a>
    );
}

export default PdfViewer;
