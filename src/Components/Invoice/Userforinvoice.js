import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material';
import {TableBody, TableCell, TableRow } from "@mui/material";
import { Table, TableContainer } from "@chakra-ui/react";
import  { useEffect, useState} from "react";
import BillingService from "../../Services/BillingService";
import Button from '@mui/material/Button';


export default function Userforinvoice({ open, onClose, onSelectDetail }) {

    const [user, setuser] = useState([]);
    const [query,setquery]=useState("")


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        BillingService.getalluser()
            .then((res) => {
                setuser(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }
    const handleDetailClick = (detail) => {
        // console.log(detail)
        onSelectDetail(detail); // Call the onSelectDetail callback with the selected detail
        onClose(); // Close the modal
    };

    const style = {
        position: 'absolute',
        top: '53%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 100,
        height: 485,
        bgcolor: 'background.paper',
        border: '',
        borderRadius: '20px',
        boxShadow: 2,
        
    };
    return (
        <>
            <Modal className="overflow-auto"
                open={open}
                onClose={onClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 450 }}>
                    <div className=" p-4 d-flex justify-content-between">
                        <div>
                            <h5 className='mt-1' style={{fontFamily:"Public Sans"}}><b>Customers</b></h5>
                        </div>
                        <div>
                            <Link to='/home/user/newuser' className="text-black" style={{ textDecoration: 'none' }}>
                                <Button style={{color:'black'}}>
                                    <i class="bi bi-plus " style={{ fontSize: '1.0em' }}></i>New</Button></Link>
                        </div>
                    </div>
                    <Box 
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { mb:2 ,ml:1, width: '48ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e)=>setquery(e.target.value)}
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
                    {/* <Paper  sx={{width:'99%'}}> */}
                        <TableContainer className="overflow-auto" style={{ maxHeight: '318px' }}>
                            <Table>
                                <TableBody>
                                    {user
                                     .filter((use)=>
                                        use.customerName.toLowerCase().includes(query))
                                    .map((details)=>(
                                    <TableRow >
                                        <Box className='bxli' style={{width:'178%'}} key={details.id} onClick={()=>handleDetailClick(details)}>
                                        <TableCell style={{ border: 'none' }}>
                                           <div><b>{details.customerName}</b></div>
                                           <div>{details.address},{details.city}-{details.pincode}</div>
                                           <div>{details.phoneNo}</div>
                                        </TableCell></Box>
                                    </TableRow>))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    {/* </Paper> */}
                   
                </Box>
            </Modal>
        </>
    )
}