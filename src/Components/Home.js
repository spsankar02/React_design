import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className='App'>
            <Header />
            <div className='row p-2 ms-2 me-2 mb-2 rounded' style={{ height: '85vh', backgroundColor: '#d5d7db' }}>
                <Sidebar />
                <div className='col-10 p-3 rounded overflow-auto' >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}