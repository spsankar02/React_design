import React from "react";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function Viewinvoice() {
    return (
        <>
            <div className="d-flex justify-content-between" style={{ height: '15%' }}>
                <div>
                    <h2>Invoice</h2>
                </div>
                <div>
                    <button type="button" class="btn btn-dark">
                    <CloudDownloadIcon className="me-2"/>Download</button>
                </div>
            </div>
            
        </>
    )
}