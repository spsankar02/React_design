import React from "react";
import '../App.css'
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className='col-2 bg-white rounded'>
      <ul className="p-0" style={{listStyleType: 'none'}}>
        <Link to='dashboard' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 mt-2 ps-3 pt-1 pb-1 sideBarli">Dashboard</li>
        </Link>
        <Link to='user' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 ps-3 pt-1 pb-1 sideBarli">User</li>
        </Link>
        <Link to='user' className="text-black" style={{textDecoration: 'none'}}>
        <li className="mb-2 ps-3 pt-1 pb-1 sideBarli">Product</li></Link>
        <Link to='user' className="text-black" style={{textDecoration: 'none'}}>
        <li className="mb-2 ps-3 pt-1 pb-1 sideBarli">Order</li></Link>
        <Link to='invoice' className="text-black" style={{textDecoration: 'none'}}>
        <li className="mb-2 ps-3 pt-1 pb-1 sideBarli">Invoice</li></Link>
      </ul>
    </div>
  )
}