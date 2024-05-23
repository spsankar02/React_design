import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { TableBody, TableCell, TableRow } from "@mui/material";
import { Table, TableContainer } from "@chakra-ui/react";
import BillingService from "../../Services/BillingService";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


export default function Productforinvoice({ open, onClose,onproductdetail }) {

    const [product, setproduct] = useState([])
    const [query, setquery] = useState("")

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        width: 80,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            //   backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));

    const handleDetailClick = (detail) => {
        // console.log(detail)
        onproductdetail(detail); 
        onClose(); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        BillingService.getallproduct()
            .then((res) => {
                setproduct(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

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
                <Box sx={{ ...style, width: 350 }}>
                    <div className=" p-4 d-flex justify-content-between">
                        <div>
                            <h5 className='mt-1' style={{ fontFamily: "Public Sans" }}><b>Products</b></h5>
                        </div>
                        <div>
                            <Link to='/home/product/newproduct' className="text-black" style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'black' }}>
                                    <i class="bi bi-plus " style={{ fontSize: '1.0em' }}></i>New</Button></Link>
                        </div>
                    </div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { mb: 2, ml: 1, width: '37ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e) => setquery(e.target.value)}
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
                    <TableContainer className="overflow-auto" style={{ maxHeight: '318px' }}>
                        <Table>
                            <TableBody>
                                {product
                                    .filter((use) =>
                                        use.productName.toLowerCase().includes(query))
                                    .map((details) => (
                                        <TableRow >
                                            <Box className='bxli' style={{ width: '278%' }} key={details.id} onClick={()=>handleDetailClick(details)}>
                                                <TableCell style={{ border: 'none' }}>
                                                    <div><b>{details.productName}</b></div>
                                                    <div> {details.currentStock >= 30 ? (
                                                        <>
                                                            <div><BorderLinearProgress
                                                                className="instock"
                                                                variant="determinate"
                                                                value={details.currentStock}
                                                                sx={{
                                                                    backgroundColor: '#a4fa8c',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: '#4CAF50', // Green color for in stock
                                                                    }, '& .MuiLinearProgress-colorPrimary': {
                                                                        Color: '#4CAF50',
                                                                    },
                                                                }}
                                                            /></div>
                                                            <div>{details.currentStock} In Stock</div></>

                                                    ) : (details.currentStock <= 29 && details.currentStock > 0) ? (
                                                        <>
                                                            <div><BorderLinearProgress
                                                                className="lowstock"
                                                                variant="determinate"
                                                                value={details.currentStock}
                                                                sx={{
                                                                    backgroundColor: '#fffd9c',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: '#FFC107',
                                                                    },
                                                                }}></BorderLinearProgress></div>
                                                            <div>{details.currentStock} Low Stock</div></>
                                                    ) : details.currentStock === 0 ? (
                                                        <>
                                                            <div><BorderLinearProgress
                                                                className="outstock"
                                                                variant="determinate"
                                                                value={details.currentStock}
                                                                sx={{
                                                                    backgroundColor: '#f7b8b5',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: '#F44336',
                                                                    },
                                                                }}
                                                            /></div>
                                                            <div>{details.currentStock} Out of Stock</div></>

                                                    ) : null}
                                                    </div>
                                                </TableCell></Box>
                                        </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>

        </>
    )
}