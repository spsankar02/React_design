import React from "react";

export function MainContent() {
    return (
        <>
            <div className="mb-2 p-1 d-flex justify-content-between rounded" style={{ height: '23%' }}>
                <div className="w-25 ms-2 me-2 mt-1  mb-1" style={{ borderRadius: '15px', backgroundColor: '#4e80f5' }}>

                </div>
                <div className="w-25 ms-2 me-2 mt-1  mb-1" style={{ borderRadius: '15px', backgroundColor: '#76cfc9' }}>

                </div>
                <div className="w-25 ms-2 me-2 mt-1  mb-1" style={{ borderRadius: '15px', backgroundColor: '#8477d9' }}>

                </div>
                <div className="w-25 ms-2 me-2 mt-1  mb-1" style={{ borderRadius: '15px', backgroundColor: '#dea564' }}>

                </div>
            </div>
            <div className="mb-2 p-2 d-flex justify-content-between rounded" style={{ height: '50%' }}>
                <div className="mt-1  mb-1 bg-white" style={{ borderRadius: '15px', width: '60%' }}>

                </div>
                <div className="mt-1  mb-1 bg-white" style={{ borderRadius: '15px', width: '38%' }}>

                </div>
            </div>
            <div className="d-flex justify-content-between p-2" style={{ height: '25%' }}>
                <div className="mt-1  mb-1 bg-white" style={{ borderRadius: '15px', width: '60%' }}>

                </div>
                <div className="mt-1  mb-1 bg-white" style={{ borderRadius: '15px', width: '38%' }}>

                </div>
            </div>
        </>
    )
}