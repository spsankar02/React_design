import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Logo from "./images.png"
import { Box } from '@mui/material';
import { useState, useEffect, forwardRef } from "react";
import BillingService from "../../Services/BillingService";
import { useParams } from "react-router-dom";

const InvoiceComponent = forwardRef((props, ref) => {
    const { id } = useParams(); // Assuming you're getting the id from the route params
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const response = await BillingService.getinvoiceById(id);
                setInvoice(response.data);
            } catch (error) {
                console.error('Error fetching billing data:', error);
            }
        };

        fetchBilling();
    }, [id]);


    return (
        <Paper id="invoice-content" ref={ref} style={{ width: '100%', borderRadius: '1%', marginBottom: '15%', marginTop: '0%' }}>
            <Table><TableRow>
                <TableCell style={{ border: 'none' }}> <div className="logo-main ms-2"><img src={Logo} alt="logo"></img></div></TableCell>
                <TableCell style={{ border: 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <div className="me-4">
                            {invoice && invoice.status && (
                                (invoice.status.includes('Paid') && (
                                    <Box size="small" borderRadius="6px" style={{ color: 'green', backgroundColor: '#c5fcd4', width: '115%' }}>
                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Paid</p>
                                    </Box>
                                )) ||
                                (invoice.status.includes('Overdue') && (
                                    <Box size="small" borderRadius="6px" style={{ color: '#ff1605', backgroundColor: '#d48f8a', width: '115%' }}>
                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Overdue</p>
                                    </Box>
                                )) ||
                                (invoice.status.includes('Pending') && (
                                    <Box size="small" borderRadius="6px" style={{ color: '#a18600', backgroundColor: '#e8c78e', width: '115%' }}>
                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Pending</p>
                                    </Box>
                                )) ||
                                (invoice.status.includes('Draft') && (
                                    <Box size="small" borderRadius="6px" style={{ color: '#8c8c8b', backgroundColor: '#f2f1ed', width: '115%' }}>
                                        <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Draft</p>
                                    </Box>
                                ))
                            )}
                        </div>
                        <div style={{ marginRight: '9%' }}>INV-{invoice.id}</div>
                    </div>
                </TableCell>
            </TableRow></Table>
            <Table style={{ marginLeft: '3%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className="pb-1" style={{ border: 'none' }}><b>Invoice From</b></TableCell>
                        <TableCell className="pb-1" style={{ border: 'none' }}><b>Invoice To</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="pt-1 w-50" style={{ border: 'none' }}>
                            <div>Jayvion Simon</div>
                            <div>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</div>
                            <div>365-374-4961</div>
                        </TableCell>
                        <TableCell className="pt-1 w-50" style={{ border: 'none' }}>
                            {invoice.order && invoice.order.user && (<>
                                <div>{invoice.order.user.customerName}</div>
                                <div>{invoice.order.user.address},{invoice.order.user.city}-{invoice.order.user.pincode}</div>
                                <div>{invoice.order.user.phoneNo}</div></>)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table style={{ marginLeft: '3%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className="pb-1 w-50" style={{ border: 'none' }}><b>Date Create</b></TableCell>
                        <TableCell className="pb-1 w-50" style={{ border: 'none' }}><b>Due Date</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="pt-1 w-50" style={{ border: 'none' }}>{invoice.createdDate}</TableCell>
                        <TableCell className="pt-1 w-50" style={{ border: 'none' }}>{invoice.dueDate}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table style={{ marginLeft: '4%', width: '90%' }}>
                <TableHead style={{ backgroundColor: '#dedede' }}>
                    <TableRow>
                        <TableCell style={{ width: '5%' }}>#</TableCell>
                        <TableCell style={{ width: '55%' }}>Description</TableCell>
                        <TableCell style={{ width: '10%' }}>Qty</TableCell>
                        <TableCell style={{ width: '10%' }}>Unit Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoice.order?.orderDetails?.map((orderDetail, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <div><b>{orderDetail.product.productName}</b></div>
                                <div>{orderDetail.product.description}</div>
                            </TableCell>
                            <TableCell>{orderDetail.orderQuantity}</TableCell>
                            <TableCell>${orderDetail.orderPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table><br />
            <div className="d-flex justify-content-between p-2 w-100">
                <div className="w-75"></div>
                <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                    <div className=''>Subtotal</div>
                    <div className='' style={{ width: '30%' }}>
                        ${invoice.subTotal}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between p-2 w-100">
                <div className="w-75"></div>
                <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                    <div className=''>Shipping</div>
                    <div className='ms-0    ' style={{ width: '30%' }}>
                        <div style={{ color: '#00bf2d' }}>
                            +${invoice.shipmentTotal}</div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between p-2 w-100">
                <div className="w-75"></div>
                <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                    <div className=''>Discount</div>
                    <div className='' style={{ width: '30%' }}>
                        <div style={{ color: '#ff5a36' }}> -${invoice.discount}</div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between p-2 w-100">
                <div className="w-75"></div>
                <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                    <div className=''>Taxes</div>
                    <div className='' style={{ width: '30%' }}>
                        <div style={{ color: '#00bf2d' }}>%${invoice.taxValue}</div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between p-2 w-100 ">
                <div className="w-75"></div>
                <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                    <div className=''><b>Total</b></div>
                    <div className='' style={{ width: '30%', size: '15px' }}>
                        <b>${invoice.amount}</b>
                    </div>
                </div>
            </div>
            <div>
                <br />
                <hr style={{ border: 'dotted', borderWidth: '1px' }}></hr>
                <br />
            </div>
        </Paper>

    );
});

export default InvoiceComponent;

