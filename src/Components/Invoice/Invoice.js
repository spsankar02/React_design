import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from "react";
import BillingService from "../../Services/BillingService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import Checkbox from '@mui/material/Checkbox';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Button from '@mui/material/Button';


export default function Invoice() {
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handlechangepage = (e, newpage) => {
    setPage(newpage)
  }
  const handlechangerow = (e) => {
    setRowsPerPage(+e.target.value)
    setPage(0)
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    BillingService.getallinvoice()
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  }
  
  const handleviewinvoice =()=>{
    navigate("/home/invoice/viewinvoice")
  }

  return (
    <>
      <div className="d-flex justify-content-between" style={{ height: '15%' }}>
        <div>
          <h2>List</h2>
        </div>
        <div>
          <Link to='newinvoice' className="text-black" style={{ textDecoration: 'none' }}>
            <button type="button" class="btn btn-dark">
              <i class="bi bi-plus " style={{ fontSize: '1.0em' }}></i>New Invoice</button></Link>
        </div>
      </div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: '#dedede' }}>
              <TableRow>
                <TableCell><Checkbox /></TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Create</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Sent</TableCell>
                <TableCell>Status</TableCell>
                <TableCell><div style={{ marginLeft: '38%' }}>Actions</div></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.map(details => (
                <TableRow key={details.id}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell style={{ width: '17%' }}>
                    <div>{details.customerName}</div>
                    <div>INV-{details.id}</div>
                  </TableCell>
                  <TableCell>{details.createdDate}</TableCell>
                  <TableCell>{details.dueDate}</TableCell>
                  <TableCell style={{ width: '12%' }}>{details.amount}</TableCell>
                  <TableCell style={{ width: '7%' }}>{details.order.items}</TableCell>
                  <TableCell style={{ width: '12%' }}>
                    {details.status.includes('Paid') ? (
                      <Box size="small" borderRadius="6px" style={{ color: 'green', backgroundColor: '#c5fcd4', width: '50%' }}>
                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Paid</p>
                      </Box>
                    ): details.status.includes('Overdue') ? (
                      <Box size="small" borderRadius="6px" style={{ color: '#ff1605', backgroundColor: '#d48f8a', width: '72%' }}>
                      <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Overdue</p>
                    </Box>
                    ): details.status.includes('Pending') ? (
                      <Box size="small" borderRadius="6px" style={{ color: '#a18600', backgroundColor: '#e8c78e', width: '72%' }}>
                      <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Pending</p>
                    </Box>
                    ): details.status.includes('Draft') ? (
                      <Box size="small" borderRadius="6px" style={{ color: '#8c8c8b', backgroundColor: '#f2f1ed', width: '50%' }}>
                      <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Draft</p>
                    </Box>
                    ):null}
                  </TableCell>
                  <TableCell>
                    <Button style={{ color: "#a3a2a2" }}>
                      <ModeEditIcon />
                    </Button>
                    <Button onClick={handleviewinvoice} style={{ color: "#a3a2a2" }}>
                      <VisibilityIcon  />
                    </Button>
                    <Button style={{ color: '#f77272' }}><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={invoice.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handlechangerow} />
      </Paper>







      {/* <div className="d-flex justify-content-between w-50 bg-primary" style={{height:'10%'}}>
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
      */}
    </>
  )
}