import React from "react";
import { Link } from "react-router-dom";


export default function Invoice() {
    return(
        <>
        <div className="d-flex justify-content-between" style={{height:'15%'}}>
            <div>
                <h2>List</h2>        
            </div>
            <div>
            <Link to='newinvoice' className="text-black" style={{textDecoration: 'none'}}>
                <button type="button" class="btn btn-dark">
                <i class="bi bi-plus " style={{fontSize:'1.0em'}}></i>New Invoice</button></Link>
            </div>
        </div>
        <div className="bg-white d-flex justify-content-between rounded" style={{height:'85%'}}>

        </div>
     
       </>
    )
}