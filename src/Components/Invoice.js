import React from "react";
import { Link } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Box,TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';


export default function Invoice() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
        <div className="d-flex justify-content-between w-50 bg-primary" style={{height:'10%'}}>
                <div className='ms-3'>All</div>
                <div>Paid</div>
                <div>Pending</div>
                <div>Overdue</div>
                <div>Draft</div>
            </div>
        <div className="w-100 bg-white rounded" style={{height:'85%'}}>
        
            <div className=" d-flex justify-content-between w-75 " style={{height:'25%'}}>
            <div className=" p-2 ms-2 me-2 mt-1  mb-1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer   components={['DatePicker']}>
                <DatePicker label="Start Date"
                />
            </DemoContainer>
         </LocalizationProvider>

        </div>
        <div className=" p-2 ms-2 me-2 mt-1  mb-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="End Date" />
            </DemoContainer>
         </LocalizationProvider>
        </div>
        <div className="w-25 p-2 ms-2 me-2 mt-1 mb-1">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-number"
          placeholder="Search customer or Invoice number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </Box>
    </div>
    </div>
          
        <div className="" style={{height:'75%'}}>
            <table className="w-100">
                <thead style={{backgroundColor:'#dedede'}}>
                    <tr>
                        <th style={{width:'4%',paddingLeft:'1%'}}><Checkbox {...label} /></th>
                        <th style={{width:'25%',padding:'1.5%'}}>Customer</th>
                        <th style={{width:'13%',padding:'1.5%'}}>Create</th>
                        <th style={{width:'13%',padding:'1.5%'}}>Due</th>
                        <th style={{width:'15%',padding:'1.5%'}}>Amount</th>
                        <th style={{width:'8%',padding:'1.5%'}}>Sent</th>
                        <th style={{width:'12%',padding:'1.5%'}}>Status</th>
                        <th style={{padding:'1.5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{width:'4%',paddingLeft:'1%'}}><Checkbox {...label} /></td>
                    <td style={{width:'25%',padding:'1.5%'}}>
                        <p className="mb-0" style={{fontSize:'0.9em'}}>Yuvanesh</p>
                        <p className="mb-0" style={{fontSize:'0.8em',color:'#a1a1a1'}}>INV-01</p>
                    </td>
                    <td style={{width:'13%',padding:'1.5%'}}>
                      <p className="mb-0" style={{fontSize:'0.9em'}}>18 Jan 2024</p>
                    </td>
                    <td style={{width:'13%',padding:'1.5%'}}>
                      <p className="mb-0" style={{fontSize:'0.9em'}}>17 Mar 2024</p>
                    </td>
                    <td style={{width:'15%',padding:'1.5%'}}>
                      <p className="mb-0" style={{fontSize:'0.9em'}}>$34,890</p>
                    </td>
                    <td style={{width:'8%',padding:'1.5%'}}>
                      <p className="mb-0" style={{fontSize:'0.9em'}}>9</p>
                    </td>
                    <td style={{width:'12%',padding:'1.5%'}}>
                    <Box size="small" borderRadius="6px" style={{color:'green',backgroundColor:'#c5fcd4',width:'50%'}}>
                    <p className="mb-0 ms-2" style={{fontSize:'0.9em'}}>Paid</p>
                    </Box>
                    </td>
                    <td style={{width:'12%',padding:'1.5%'}}>
                    <Button size="small" style={{color:'#a1a1a1', width:'0%'}}>
                        <MoreVertIcon />
                    </Button>
                    </td>
                    
                </tr>
                </tbody>
            </table>

        </div>
         
            

        </div>
     
       </>
    )
}