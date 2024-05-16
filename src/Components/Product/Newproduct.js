import React, { useState } from "react";
import { Box, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import BillingService from "../../Services/BillingService";
import { useNavigate } from "react-router-dom";

export default function Newproduct(props) {

    const navigate = useNavigate();
    const [isNewUserClicked, setIsNewUserClicked] = useState(false);


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

    const save = (e) => {
        e.preventDefault();
        const product = {
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
        }
        if (!productName.trim() || !description.trim() || !hsnNo.trim() || !mrp.trim() || !currentStock.trim() || !retailRate.trim() ||
           !unitPrice.trim() || !wholesaleRate.trim() || !minQty.trim() || !maxQty.trim() || !gst.trim()) {
            setIsNewUserClicked(true);
        } else {
            BillingService.createproduct(product)
                .then(() => {
                    navigate("/home/product", { state: { successMessage: 'Product added successfully!' } })
                })
        }
    }

    const isHsnNoValid = hsnNo.trim() !== '' || !isNewUserClicked;
    const isMrpValid = mrp.trim() !== '' || !isNewUserClicked;
    const isProductNameValid = productName.trim() !== '' || !isNewUserClicked;
    const isDescriptionValid = description.trim() !== '' || !isNewUserClicked;
    const isCurrentStockValid = currentStock.trim() !== '' || !isNewUserClicked;
    const isUnitPriceValid = unitPrice.trim() !== '' || !isNewUserClicked;
    const isRetailRateValid = retailRate.trim() !== '' || !isNewUserClicked;
    const isWholesaleRateValid = wholesaleRate.trim() !== '' || !isNewUserClicked;
    const isMinQtyValid = minQty.trim() !== '' || !isNewUserClicked;
    const isMaxQtyValid = maxQty.trim() !== '' || !isNewUserClicked;
    const isGstValid = gst.trim() !== '' || !isNewUserClicked;

    const changeHsnNoHandler = (e) => {
        setHsnNo(e.target.value);
    };

    const changeMrpHandler = (e) => {
        setMrp(e.target.value);
    };

    const changeProductNameHandler = (e) => {
        setProductName(e.target.value);
    };

    const changeDescriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const changeCurrentStockHandler = (e) => {
        setCurrentStock(e.target.value);
    };

    const changeUnitPriceHandler =(e)=>{
        setUnitPrice(e.target.value);
    }

    const changeRetailRateHandler = (e) => {
        setRetailRate(e.target.value);
    };

    const changeWholesaleRateHandler = (e) => {
        setWholesaleRate(e.target.value);
    };

    const changeMinQtyHandler = (e) => {
        setMinQty(e.target.value);
    };

    const changeMaxQtyHandler = (e) => {
        setMaxQty(e.target.value);
    };

    const changeGstHandler = (e) => {
        setGst(e.target.value);
    };






    return (
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
                                                error={!isProductNameValid}
                                                helperText={!isProductNameValid && isNewUserClicked ? 'Product Name is required' : ''}
                                                onChange={changeProductNameHandler}
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
                                                error={!isDescriptionValid}
                                                helperText={!isDescriptionValid && isNewUserClicked ? 'Product Description is required' : ''}
                                                onChange={changeDescriptionHandler}
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
                                                error={!isMrpValid}
                                                helperText={!isMrpValid && isNewUserClicked ? 'Mrp is required' : ''}
                                                onChange={changeMrpHandler}
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
                                                error={!isHsnNoValid}
                                                helperText={!isHsnNoValid && isNewUserClicked ? 'HsnNo is required' : ''}
                                                onChange={changeHsnNoHandler}
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
                                                error={!isCurrentStockValid}
                                                helperText={!isCurrentStockValid && isNewUserClicked ? 'Current stock is required' : ''}
                                                onChange={changeCurrentStockHandler}
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
                                                error={!isMinQtyValid}
                                                helperText={!isMinQtyValid && isNewUserClicked ? 'Min Qty is required' : ''}
                                                onChange={changeMinQtyHandler}
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
                                                error={!isMaxQtyValid}
                                                helperText={!isMaxQtyValid && isNewUserClicked ? 'Max Qty is required' : ''}
                                                onChange={changeMaxQtyHandler}
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
                                                error={!isUnitPriceValid}
                                                helperText={!isUnitPriceValid && isNewUserClicked ? 'Max Qty is required' : ''}
                                                onChange={changeUnitPriceHandler}
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
                                                error={!isRetailRateValid}
                                                helperText={!isRetailRateValid && isNewUserClicked ? 'Retail Rate is required' : ''}
                                                onChange={changeRetailRateHandler}
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
                                                error={!isWholesaleRateValid}
                                                helperText={!isWholesaleRateValid && isNewUserClicked ? 'Wholesale Rate is required' : ''}
                                                onChange={changeWholesaleRateHandler}
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
                                                error={!isGstValid}
                                                helperText={!isGstValid && isNewUserClicked ? 'Gst is required' : ''}
                                                onChange={changeGstHandler}
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
            <button style={{ marginTop: '2%', marginLeft: '92%' }} type="button" class="btn btn-dark" onClick={save} >Create</button>


        </>
    )
}