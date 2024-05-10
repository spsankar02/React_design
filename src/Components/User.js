import { Table, TableContainer } from "@chakra-ui/react";
import Checkbox from '@mui/material/Checkbox';
import { Paper, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BillingService from "../Services/BillingService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function User() {
    const navigate=useNavigate();
    const [user, setuser] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

   
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

    const deleteuser=(id)=>{
        let payload = { id: id }
        BillingService.deleteuser(payload)
        .then((res) => {
          setuser(user.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting billing:", error);
        });
    }

    const handlechangepage = (e, newpage) => {
        setPage(newpage)
    }

    const handlechangerow = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    const edituser=(id)=>{
        navigate(`/home/user/edituser/${id}`)
    }

    return (
        <>
            <div className="d-flex justify-content-between" style={{ height: '15%' }}>
                <div>
                    <h2>List</h2>
                </div>
                <div>
                    <Link to='newuser' className="text-black" style={{ textDecoration: 'none' }}>
                        <button type="button" class="btn btn-dark">
                            <i class="bi bi-plus " style={{ fontSize: '1.0em' }}></i>New User</button></Link>
                </div>
            </div>
            <Paper className='mb-5' sx={{ width: '100%' }}>
                <TableContainer>
                    <Table>
                        <TableHead style={{ backgroundColor: '#dedede' }}>
                            <TableRow>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell style={{ width: '30%' }}>Name</TableCell>
                                <TableCell style={{ width: '20%' }}>Phone Number</TableCell>
                                <TableCell style={{ width: '23%' }}>Company</TableCell>
                                <TableCell style={{ width: '19%' }}>Role</TableCell>
                                <TableCell style={{ width: '8%' }}><div className="ms-5">Actions</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((detail) => (
                                    <TableRow key={detail.id}>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell style={{ width: '30%' }}>
                                            <div>{detail.customerName}</div>
                                            <div style={{color:"#787878"}}>{detail.emailAddress}</div>
                                        </TableCell>
                                        <TableCell style={{ width: '20%' }}>{detail.phoneNo}</TableCell>
                                        <TableCell style={{ width: '23%' }}>{detail.companyName}</TableCell>
                                        <TableCell style={{ width: '19%' }}>{detail.role}</TableCell>
                                        <TableCell style={{ width: '8%' }}>
                                            <Button style={{ color: "#a3a2a2" }} onClick={()=>edituser(detail.id)}>
                                                <ModeEditIcon />
                                            </Button>
                                            <Button style={{color:'#f77272'}}  onClick={handleOpen}><DeleteIcon /></Button>
                                            <Dialog
                                                open={open}
                                                style={{backgroundColor:'transparent'}}
                                                backdropStyle={{ backgroundColor: 'lightpink' }}
                                                onClose={handleClose}
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
                                                    <Button style={{color:'#f74343'}} onClick={() => { handleClose(); deleteuser(detail.id); }}>Delete</Button>
                                                    <Button style={{color:'#969696'}} onClick={handleClose} autoFocus>
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
                    count={user.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handlechangerow} />
            </Paper>
        </>
    )
}