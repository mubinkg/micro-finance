'use client'
import { useState } from 'react';
import { Document, pdfjs, Page } from 'react-pdf';
import {Container, Button} from 'reactstrap'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({url}) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function setNextPage(page){
        if(page <= numPages){
            setPageNumber(page)
        }
    }

    function previousPage(page){
        if(page != 0){
            setPageNumber(page)
        }
    }

    return (
        <Container fluid className='mt-4'>
            <div className='d-flex justify-content-center'>
                <Document file={
                    {
                        url: url
                    }
                }  onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} height="1000" scale={1.8}/>
                </Document>
            </div>
            <div className='d-flex justify-content-center gap-4 align-items-center mt-4'>
                <Button size='sm' color='primary' onClick={()=>previousPage(pageNumber-1)}>Prevous Page</Button>
                <h5>Show {pageNumber} of {numPages}</h5>
                <Button size='sm' color='primary' onClick={()=>setNextPage(pageNumber + 1)}>Next Page</Button>
            </div>
        </Container>
    )
}