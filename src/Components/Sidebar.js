import React from "react";
import '../App.css'
import { Link } from "react-router-dom";
import {Box} from '@mui/material';
import Button from '@mui/material/Button';


export default function Sidebar() {
  return (
    <div className='col-2 bg-white rounded' style={{position:'fixed',height:'78%'}}>
      <ul className="p-0" style={{listStyleType: 'none'}}>
      <Box sx={{ '& button': { m: 0 } }}>
        <Link to='dashboard' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 mt-2 ps-1 pt-1 pb-1 sideBarli">
            <Button size='small'  style={{color:'#8477d9',width:'85%',fontFamily:''}}>
              <div style={{color:'black'}}><b>Dashboard</b></div>
            </Button>
          </li>
        </Link>
        <Link to='user' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 ps-1 pt-1 pb-1 sideBarli">
          <Button size="small" style={{color:'#8477d9',width:'85%'}}>
          <div style={{color:'black'}}><b>User</b></div>  
          </Button>
          </li>
        </Link>
        <Link to='product' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 ps-1 pt-1 pb-1 sideBarli">
          <Button size="small" style={{color:'#8477d9',width:'85%'}}>
          <div style={{color:'black'}}><b>Products</b></div>  
          </Button>
          </li>
        </Link>
        <Link to='order' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 ps-1 pt-1 pb-1 sideBarli">
          <Button size="small" style={{color:'#8477d9',width:'85%'}}>
          <div style={{color:'black'}}><b>Order</b></div>  
          </Button>
          </li>
        </Link>
        <Link to='invoice' className="text-black" style={{textDecoration: 'none'}}>
          <li className="mb-2 ps-1 pt-1 pb-1 sideBarli">
          <Button size="small" style={{color:'#8477d9',width:'85%'}}>
            <div style={{color:'black'}}><b>Invoice</b></div>
          </Button>
          </li>
        </Link>
        </Box>
      </ul>
    </div>
  )
}