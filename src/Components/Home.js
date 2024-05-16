import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className='App'>
            <Header />
            <div className='row p-2 ms-2 me-2 mb-2 rounded overflow-auto' style={{ height: '86vh',backgroundColor:'#e0e0e0' }}>
             <Sidebar />            

                <div className='col-10 p-3 rounded ' style={{marginLeft:'218px'}} >
                    <Outlet />
                </div>
                </div>
        </div>
    )
}