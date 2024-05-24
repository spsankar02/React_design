import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Logo from "./images.png"
import { Box } from '@mui/material';

class InvoiceComponent extends React.Component{
    render(){
    return(
        <Paper id="invoice-content" style={{ width: '100%', borderRadius: '1%', marginBottom: '15%', marginTop: '0%' }}>
        <Table><TableRow>
            <TableCell style={{ border: 'none' }}> <div className="logo-main ms-2"><img src={Logo} alt="logo"></img></div></TableCell>
            <TableCell style={{ border: 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div className="me-5">
                        <Box size="small" borderRadius="6px" style={{ color: 'green', backgroundColor: '#c5fcd4', width: '120%' }}>
                            <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Paid</p>
                        </Box>
                    </div>
                    <div style={{ marginRight: '9%' }}>INV-192</div>
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
                    <TableCell className="pt-1" style={{ border: 'none' }}>
                        <div>Jayvion Simon</div>
                        <div>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</div>
                        <div>365-374-4961</div>
                    </TableCell>
                    <TableCell className="pt-1" style={{ border: 'none' }}>
                        <div>Jayvion Simon</div>
                        <div>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</div>
                        <div>365-374-4961</div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Table style={{ marginLeft: '3%' }}>
            <TableHead>
                <TableRow>
                    <TableCell className="pb-1" style={{ border: 'none' }}><b>Date Create</b></TableCell>
                    <TableCell className="pb-1" style={{ border: 'none' }}><b>Due Date</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell className="pt-1" style={{ border: 'none' }}>05 may 2024</TableCell>
                    <TableCell className="pt-1" style={{ border: 'none' }}>06 may 2024</TableCell>
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
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                        <div><b>Nike Air Force 1 NDESTRUKT</b></div>
                        <div>The sun slowly set over the horizon, painting the sky in vibrant hues of orange</div>
                    </TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$83.74</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>
                        <div><b>Nike Air Force 1 NDESTRUKT</b></div>
                        <div>The sun slowly set over the horizon, painting the sky in vibrant hues of orange</div>
                    </TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$83.74</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>
                        <div><b>Nike Air Force 1 NDESTRUKT</b></div>
                        <div>The sun slowly set over the horizon, painting the sky in vibrant hues of orange</div>
                    </TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$83.74</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>
                        <div><b>Nike Air Force 1 NDESTRUKT</b></div>
                        <div>The sun slowly set over the horizon, painting the sky in vibrant hues of orange</div>
                    </TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$83.74</TableCell>
                </TableRow>
            </TableBody>
        </Table><br/>
        <div className="d-flex justify-content-between p-2 w-100">
            <div className="w-75"></div>
            <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                <div className=''>Subtotal</div>
                <div className='' style={{ width: '30%' }}>
                    $2,373.51
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-between p-2 w-100">
            <div className="w-75"></div>
            <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                <div className=''>Shipping</div>
                <div className='ms-0    ' style={{ width: '30%' }}>
                    <div style={{ color: '#00bf2d' }}>
                        +$94.25</div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-between p-2 w-100">
            <div className="w-75"></div>
            <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                <div className=''>Discount</div>
                <div className='' style={{ width: '30%' }}>
                    <div style={{ color: '#ff5a36' }}> -$20.54</div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-between p-2 w-100">
            <div className="w-75"></div>
            <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                <div className=''>Taxes</div>
                <div className='' style={{ width: '30%' }}>
                    <div style={{ color: '#00bf2d' }}>%$72.91</div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-between p-2 w-100 ">
            <div className="w-75"></div>
            <div className="d-flex justify-content-between me-5" style={{ width: '30%' }}>
                <div className=''><b>Total</b></div>
                <div className='' style={{ width: '30%', size: '15px' }}>
                    <b>$2,331.63</b>
                </div>
            </div>
        </div>
    <div>
        <br/>
        <hr style={{border:'dotted', borderWidth: '1px'}}></hr>
        <br/>
    </div>
    </Paper>

    )
}
}
export default InvoiceComponent;