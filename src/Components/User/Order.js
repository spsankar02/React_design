import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer,TablePagination, TableHead, TableRow, Checkbox, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BillingService from "../../Services/BillingService";
import Button from '@mui/material/Button';


export default function Order() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
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
        BillingService.getallorder()
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    const handleProductToggle = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    }

    return (
        <>
            <div className="mb-4">
            <b><h2 style={{fontFamily:'Brandon Grotesque Black',fontWeight:'bolder'}}>Orders</h2></b>
            </div>
            <Paper className="mb-5">
                <TableContainer>
                    <Table>
                        <TableHead style={{ backgroundColor: '#f4ebff' }}>
                            <TableRow>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell><b>Order</b></TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order) => (
                                <React.Fragment key={order.id}>
                                    <TableRow>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell>#{order.id}</TableCell>
                                        <TableCell>
                                            <div>{order.user.customerName}</div>
                                            <div style={{ color: "#787878" }}>{order.user.emailAddress}</div>
                                        </TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell>{order.items}</TableCell>
                                        <TableCell>{order.orderAmount}</TableCell>
                                        <TableCell>
                                            {order && order.orderStatus && (
                                                (order.orderStatus.includes('Paid') && (
                                                    <Box size="small" borderRadius="6px" style={{ color: 'green', backgroundColor: '#c5fcd4', width: '55%' }}>
                                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Paid</p>
                                                    </Box>
                                                )) ||
                                                (order.orderStatus.includes('Overdue') && (
                                                    <Box size="small" borderRadius="6px" style={{ color: '#ff1605', backgroundColor: '#d48f8a', width: '79%' }}>
                                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Overdue</p>
                                                    </Box>
                                                )) ||
                                                (order.orderStatus.includes('Pending') && (
                                                    <Box size="small" borderRadius="6px" style={{ color: '#a18600', backgroundColor: '#e8c78e', width: '79%' }}>
                                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Pending</p>
                                                    </Box>
                                                )) ||
                                                (order.orderStatus.includes('Draft') && (
                                                    <Box size="small" borderRadius="6px" style={{ color: '#8c8c8b', backgroundColor: '#f2f1ed', width: '55%' }}>
                                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Draft</p>
                                                    </Box>
                                                ))
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button style={{color:'black',borderRadius:'75%'}}><KeyboardArrowDownIcon onClick={() => handleProductToggle(order.id)} /></Button>
                                        </TableCell>
                                    </TableRow>
                                    {expandedOrderId === order.id && (
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <TableContainer>
                                                    <Table>
                                                        <TableBody>
                                                            {order.orderDetails?.map((details, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell></TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell className="w-75" style={{textAlign:'3px'}}>
                                                                        <div>{details.product.productName}</div>
                                                                        <div>{details.product.description}</div>
                                                                    </TableCell>
                                                                    <TableCell className="w-25">x{details.orderQuantity}</TableCell>
                                                                    <TableCell className="w-25">${details.orderPrice.toFixed(2)}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={orders.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handlechangerow} />
            </Paper>
           
        </>
    )
}
