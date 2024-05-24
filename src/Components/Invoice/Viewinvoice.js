import React from "react";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useReactToPrint } from 'react-to-print';
import InvoiceComponent from "./InvoiceComponent";


export default function Viewinvoice() {
    const invoiceRef = React.useRef();
    const handlePrint = useReactToPrint({
      content: () => invoiceRef.current,
    });
    
    return (
        <>
            <div className="d-flex justify-content-between" style={{ height: '8%' }}>
                <div>
                    <h2>Invoice</h2>
                </div>
                <div>
                    <button type="button" class="btn btn-dark" onClick={handlePrint}>
                        <CloudDownloadIcon className="me-2" />Download</button>
                </div>
            </div>
            <InvoiceComponent ref={invoiceRef} />
           
        </>
    )
}