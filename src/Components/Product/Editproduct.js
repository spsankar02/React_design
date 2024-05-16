import React from "react";
import { Box, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import BillingService from "../../Services/BillingService";
import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

export default function Editproduct(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [hsnNo, setHsnNo] = useState("")
    const [mrp, setMrp] = useState("")
    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [currentStock, setCurrentStock] = useState("")
    const [unitPrice,setUnitPrice] = useState("")
    const [retailRate, setRetailRate] = useState("")
    const [wholesaleRate, setWholesaleRate] = useState("")
    const [minQty, setMinQty] = useState("")
    const [maxQty, setMaxQty] = useState("")
    const [gst, setGst] = useState("")

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        BillingService.getallproduct()
            .then((res) => {
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    useEffect(() => {
        BillingService.getProductById(id)
            .then((res) => {
                const productDetails = res.data;
                console.log(productDetails.hsnNo)
                setHsnNo(productDetails.hsnNo);
                setMrp(productDetails.mrp);
                setProductName(productDetails.productName);
                setDescription(productDetails.description);
                setUnitPrice(productDetails.unitPrice);
                setCurrentStock(productDetails.currentStock);
                setRetailRate(productDetails.retailRate);
                setWholesaleRate(productDetails.wholesaleRate);
                setMinQty(productDetails.minQty);
                setMaxQty(productDetails.maxQty);
                setGst(productDetails.gst);
                // Update other fields similarly
            })
            .catch((error) => {
                console.error('Error updating product details:', error);
            });
    }, [id]);
    
    const updateproduct = (e) => {
        e.preventDefault();
        const updatedproduct = {
            id:id,
            hsnNo: hsnNo,
            mrp: mrp,
            productName: productName,
            description: description,
            currentStock: currentStock,
            unitPrice:unitPrice,
            retailRate: retailRate,
            wholesaleRate: wholesaleRate,
            minQty: minQty,
            maxQty: maxQty,
            gst: gst
        };
        console.log(updatedproduct)
        BillingService.updateproduct(updatedproduct)
        
        .then((res) => {
            console.log('Billing updated successfully:', res);
            navigate('/home/product', { state: { successMessage: 'User updated successfully!' } });
        })
        .catch((error) => {
            console.error('Error updating billing:', error);
            // Handle error scenarios, such as displaying error messages to the user
        });
};



    return(
        <>
         <div className="mb-3 "><h4>Create a new Product</h4></div>
            <h6>Information</h6>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableBody >
                            <TableRow>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Product Name"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Mrp"
                                                value={mrp}
                                                onChange={(e) => setMrp(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Hsn No"
                                                value={hsnNo}
                                                onChange={(e) => setHsnNo(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <h6 className="mt-3">Properties</h6>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableBody >
                            <TableRow>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Current stock"
                                                placeholder="0"
                                                value={currentStock}
                                                onChange={(e) => setCurrentStock(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Min Qty"
                                                placeholder="0"
                                                value={minQty}
                                                onChange={(e) => setMinQty(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Max Qty"
                                                placeholder="0"
                                                value={maxQty}
                                                onChange={(e) => setMaxQty(e.target.value)}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <h6 className="mt-3">Prices</h6>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableBody >
                            <TableRow>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Unit Price"
                                                value={unitPrice}
                                                onChange={(e) => setUnitPrice(e.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                InputLabelProps={{ required: false }}
                                            />
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Retail rate"
                                                value={retailRate}
                                                onChange={(e) => setRetailRate(e.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                InputLabelProps={{ required: false }} />
                                        </div>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="Wholesale Rate"
                                                value={wholesaleRate}
                                                onChange={(e) => setWholesaleRate(e.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                InputLabelProps={{ required: false }} />
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ border: 'none' }}>
                                    <Box component="form"
                                        sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                        noValidate
                                        autoComplete="off">
                                        <div>
                                            <TextField
                                                id="outlined-number"
                                                size="small"
                                                required='true'
                                                label="GST"
                                                value={gst}
                                                onChange={(e) => setGst(e.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                InputLabelProps={{ required: false }} />
                                        </div>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <button style={{ marginTop: '2%', marginLeft: '87%' }} type="button" class="btn btn-dark"  onClick={updateproduct} >Save changes</button>


        </>
    )
}