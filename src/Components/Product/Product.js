import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";
import BillingService from "../../Services/BillingService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
// import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';



export default function Product() {

    const [product, setproduct] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(null);
    const navigate = useNavigate();


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

    const handleOpenDialog = (id) => {
        setOpenDialog(id);
    };

    const handleCloseDialog = () => {
        setOpenDialog(null);
    };



    useEffect(() => {
        const state = location.state;
        if (state && state.successMessage) {
            setSuccessMessage(state.successMessage);
        }
    }, [location.state]);

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
    const handlechangepage = (e, newpage) => {
        setPage(newpage)
    }

    const handleclick = (id) => {
        navigate(`/home/product/editproduct/${id}`)
    }

    const handlechangerow = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }
    const deleteAndShowSnackbar = async (id) => {
        try {
            deleteproduct(id);
            handleCloseSnackbar();
            handleOpenSnackbar();
        } catch (error) {
            console.error("Error deleting user:", error);
            // Handle error if necessary
        }
    };
    const deleteproduct = (id) => {
        const payload = { id };

        BillingService.deleteproduct(payload)
            .then((res) => {
                setproduct(product.filter((product) => product.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting billing:", error);
            });
    };
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleOpenSnackbar = () => setOpenSnackbar(true);
    const handleCloseSnackbar = () => setOpenSnackbar(false);


    return (
        <>
            <div className="d-flex justify-content-between" style={{ height: '15%' }}>
                <div>
                    <h2>Products</h2>
                </div>
                <div>
                    <Link to='newproduct' className="text-black" style={{ textDecoration: 'none' }}>
                        <button type="button" class="btn btn-dark">
                            <i class="bi bi-plus " style={{ fontSize: '1.0em' }}></i>New Product</button></Link>
                </div>
            </div>
            <Paper className="mb-5" sx={{ widht: '100%' }}>
                <TableContainer>
                    <Table>
                        <TableHead style={{ backgroundColor: '#dedede' }}>
                            <TableRow>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell style={{ width: '30%' }}>Product Name</TableCell>
                                <TableCell style={{ width: '15%' }}>Hsn No</TableCell>
                                <TableCell style={{ width: '20%' }}>Stock status</TableCell>
                                <TableCell style={{ width: '15%' }}>Unit price</TableCell>
                                <TableCell style={{ width: '20%' }}><div className="ms-5">Actions</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((detail) => (
                                    <TableRow key={detail.id}>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell style={{ width: '30%' }}>{detail.productName}</TableCell>
                                        <TableCell style={{ width: '15%' }}><div>{detail.hsnNo}</div></TableCell>
                                        <TableCell style={{ width: '20%' }}>
                                            {detail.currentStock >= 30 ? (
                                                <>
                                                    <div><BorderLinearProgress
                                                        className="instock"
                                                        variant="determinate"
                                                        value={detail.currentStock}
                                                        sx={{
                                                            backgroundColor:'#a4fa8c',
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: '#4CAF50', // Green color for in stock
                                                            }, '& .MuiLinearProgress-colorPrimary': {
                                                                Color: '#4CAF50',
                                                            },
                                                        }}
                                                    /></div>
                                                    <div>{detail.currentStock} In Stock</div></>

                                            ) : detail.currentStock <=29 && detail.currentStock > 0 ? (
                                                <>
                                                    <div><BorderLinearProgress
                                                        className="lowstock"
                                                        variant="determinate"
                                                        value={detail.currentStock}
                                                        sx={{
                                                            backgroundColor:'#fffd9c',
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: '#FFC107', 
                                                            },
                                                        }}></BorderLinearProgress></div>
                                                    <div>{detail.currentStock} Low Stock</div></>
                                            ) : detail.currentStock === 0 ? (
                                                <>
                                                    <div><BorderLinearProgress
                                                        className="outstock"
                                                        variant="determinate"
                                                        value={detail.currentStock}
                                                        sx={{
                                                            backgroundColor:'#f7b8b5',
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: '#F44336',
                                                            },
                                                        }}
                                                    /></div>
                                                    <div>{detail.currentStock} Out of Stock</div></>

                                            ) : null}
                                        </TableCell>
                                        <TableCell style={{ width: '15%' }}>{detail.unitPrice}</TableCell>
                                        <TableCell style={{ width: '20%' }}>
                                            <Button style={{ color: "#a3a2a2" }} onClick={() => handleclick(detail.id)}>
                                                <ModeEditIcon />
                                            </Button>
                                            <Button style={{ color: '#f77272' }} onClick={() => handleOpenDialog(detail.id)}><DeleteIcon /></Button>
                                            <Dialog
                                                open={openDialog === detail.id}
                                                style={{ backgroundColor: 'transparent' }}
                                                backdropStyle={{ backgroundColor: 'lightpink' }}
                                                onClose={handleCloseDialog}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Delete"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Are you sure want to delete? </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button style={{ color: '#f74343' }} onClick={() => deleteAndShowSnackbar(detail.id)}>Delete</Button>
                                                    <Button style={{ color: '#969696' }} onClick={handleCloseDialog} autoFocus>
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={product.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handlechangerow} />
            </Paper>
            {successMessage && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                    <Alert onClose={() => setSuccessMessage('')} severity="success" variant="filled">
                        {successMessage}
                    </Alert>
                </Snackbar>)}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
                    Product deleted successfully!
                </Alert>
            </Snackbar>
        </>
    )
}