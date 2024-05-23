import React, { useState } from "react";
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Userforinvoice from "./Userforinvoice";
import Productforinvoice from "./Productforinvoice";
import BillingService from "../../Services/BillingService";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


export default function CreateInvoice() {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [productDetailsList, setProductDetailsList] = useState([]);
    const [openproduct, setOpenproduct] = useState(false);
    const [shippingvalue, setshippingvalue] = useState('');
    const [discountvalue, setdiscountvalue] = useState('');
    const [taxvalue, settaxvalue] = useState('')

    const [status, setStatus] = useState('Draft')
    const handlesetstatus = (e) => {
        setStatus(e.target.value)
    }

    const [createdDate, setCreatedDate] = useState(dayjs())
    const handlecreateddate = (newvalue) => {
        setCreatedDate(newvalue)
    }

    const [dueDate, setDueDate] = useState(dayjs())
    const handleduedate = (newvalue) => {
        setDueDate(newvalue)
    }



    const [orderDetails,setOrderDetails]=useState([])
    const handleorderdetails =(e)=>{
        setOrderDetails(e)
    }

    const [user, setUser] = useState('');
    const handlesetuser = (detail) => {
        console.log(detail)
        setUser(detail)
    }


   


    const handlechangeshippingvalue = (e) => {
        setshippingvalue(e.target.value)
    }

    const handlechangediscountvalue = (e) => {
        setdiscountvalue(e.target.value)
    }

    const handlechangetaxvalue = (e) => {
        settaxvalue(e.target.value)
    }

    const currencies = [
        {
            value: 'Paid',
            label: 'Paid',
        },
        {
            value: 'Pending',
            label: 'Pending',
        },
        {
            value: 'Overdue',
            label: 'Overdue',
        },
        {
            value: 'Draft',
            label: 'Draft',
        },
    ];

    const handleproductopen = () => {
        setOpenproduct(true);
    }

    const handleproductclose = () => {
        setOpenproduct(false);
    }

    const handleSelectDetail = (detail) => {
        console.log("details:", detail)
        setSelectedDetail(detail);
    };

    const handleProductSelectedDetail = (index, detail) => {
        setProductDetailsList(prevDetailsList => {
            const updatedDetailsList = [...prevDetailsList];
            updatedDetailsList[index] = detail; // Update the product details for the specified item index
            return updatedDetailsList;
        });
    }


    const [itemList, setItemList] = useState([]);

    const addItem = () => {
        setItemList(prevList => [...prevList, 1]); // Add a new item (1 in this case)
    }

    const removeItem = () => {
        if (itemList.length > 0) {
            setItemList(prevList => prevList.slice(0, -1)); // Remove the last item from the array
        }
    }

    const [quantityList, setQuantityList] = useState(Array(itemList.length).fill(0));
    const [totalList, setTotalList] = useState(Array(itemList.length).fill(0)); // Add this line

   
    // Function to update quantity for a specific item
    const handleQuantityChange = (index, value) => {
        const updatedQuantityList = [...quantityList];
        updatedQuantityList[index] = value; // Update the quantity for the specified item index
        setQuantityList(updatedQuantityList);
        const selectProductDetail = productDetailsList[index]; // Access product details for the current item
        // Calculate total for the item
        // Assume selectproductdetail contains the product details for the item
        const unitPrice = selectProductDetail ? selectProductDetail.unitPrice : 0;
        console.log(unitPrice);

        const total = value * unitPrice;
        setTotalList(prevTotalList => {
            const updatedTotalList = [...prevTotalList];
            updatedTotalList[index] = total; // Update the total for the specified item index
            return updatedTotalList;
        });
    }

    const subtotal = totalList.reduce((acc, curr) => acc + curr, 0); // Sum up all values in totalList

    let overalltotal = parseFloat(subtotal);
    let totalWithShippingPrice = overalltotal + parseFloat(shippingvalue);
    let totalWithDiscount = totalWithShippingPrice - parseFloat(discountvalue);
    overalltotal = totalWithDiscount;
    let totalWithTax = parseFloat(taxvalue / 100) * totalWithDiscount;
    overalltotal += totalWithTax

    const save = (e) => {
        e.preventDefault();
        const invoice = {
            user: selectedDetail,
            status: status,
            createdDate: createdDate,
            dueDate: dueDate,
            orderDetails:itemList.map((_,index)=>({
                quantityList:quantityList[index],
                totalList:totalList[index],
                productDetailsList:productDetailsList[index]
            })),
            overalltotal:overalltotal

        }

        BillingService.createinvoice(invoice).then(() => {
            navigate("/home/invoice")
        })
    }



    const items = itemList.map((item, index) => {
        const selectproductdetail = productDetailsList[index];
        const quantity = quantityList[index];
        console.log(quantity)
        const total = totalList[index]; // Get total for the current item


        return (
            <div className="d-flex justify-content-between">
                <div className="mt-2"> <i class="bi bi-plus " style={{ fontSize: '1.5em' }} onClick={handleproductopen}></i>
                    <Productforinvoice open={openproduct} onClose={handleproductclose} onproductdetail={(detail) => handleProductSelectedDetail(index, detail)} /></div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '18ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-number"
                                label="Title"
                                size="small"
                                value={selectproductdetail ? selectproductdetail.productName : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    </Box>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '18ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-number"
                                label="Hsn No"
                                size="small"
                                value={selectproductdetail ? selectproductdetail.hsnNo : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    </Box>
                </div>
                <div>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '18ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                            <TextField
                                id="outlined-select-currency"
                                label="Mrp"
                                size="small"
                                value={selectproductdetail ? selectproductdetail.mrp : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                            </TextField>
                        </div>
                    </Box>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '13ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-number"
                                label="Quantity"
                                size="small"
                                placeholder="0"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    </Box>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '10ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-number"
                                label="Price"
                                size="small"
                                placeholder="$  0.00"
                                value={selectproductdetail ? selectproductdetail.unitPrice : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    </Box>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '10ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-number"
                                label="Total"
                                size="small"
                                placeholder="$    0.00"
                                value={total}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    </Box>
                </div>


                <IconButton aria-label="delete" onClick={removeItem}>
                    <DeleteIcon />
                </IconButton>

            </div>
        )
    })

    return (
        <>
            <div className="mb-3 "><h4>Create a new Invoice</h4></div>
            <div className="d-flex justify-content-between bg-white p-3" >
                <div className="w-40 bg-white">
                    <div className="d-flex justify-content-between" >
                        <div className="w-50 ms-3 mt-2">
                            <h3>From:</h3>
                        </div>
                        <div className="w-50 mt-3" style={{ marginLeft: '350px' }}>
                            <ModeEditIcon />
                        </div>
                    </div>
                    <div className="ms-3">
                        <div><b>Jayvion Simon</b></div>
                        <div>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</div>
                        <div>365-374-4961</div>
                    </div>
                </div>
                <div className="w-40 bg-white">
                    <div className="d-flex justify-content-between ">
                        <div className="w-50 ms-3 mt-2">
                            <h3>To:</h3>
                        </div>
                        <div className="w-50 mt-3" style={{ marginLeft: '350px' }}>
                            <ModeEditIcon onClick={handleOpen} />

                            <Userforinvoice open={open} value={user} onChange={handlesetuser} onClose={handleClose} onSelectDetail={handleSelectDetail} />

                        </div>
                    </div>
                    {selectedDetail && (
                        <>
                            <div style={{ marginLeft: '5%' }}>
                                <b>{selectedDetail.customerName}</b>
                            </div>
                            <div style={{ marginLeft: '5%' }}>
                                {selectedDetail.address}, {selectedDetail.city}-{selectedDetail.pincode}
                            </div>
                            <div style={{ marginLeft: '5%' }}>
                                {selectedDetail.phoneNo}
                            </div>
                        </>
                    )}

                </div>
            </div>
            <div className="d-flex justify-content-between p-3" style={{ backgroundColor: '#c9c9c9' }}>
                <div className="w-25 p-2 ms-2 me-2 mt-1  mb-1">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-number"
                                label="Invoice number"
                                value="INV-"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </div>
                    </Box>
                </div>
                <div className="w-25 p-2 ms-2 me-2 mt-1  mb-1">
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Status"
                                defaultValue="Draft"
                                value={status}
                                onChange={handlesetstatus}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value} >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                </div>
                <div className="w-25 p-2 ms-2 me-2 mt-1  mb-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Date create"
                                value={createdDate}
                                renderInput={(params) => <TextField {...params} />}
                                onChange={handlecreateddate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                </div>
                <div className="w-25 p-2 ms-2 me-2 mt-1  mb-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Due date"
                                value={dueDate}
                                renderInput={(params) => <TextField {...params} />}
                                onChange={handleduedate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>

            <div className="p-3" style={{ backgroundColor: '#ffffff' }}>
                <div><h6 className="">Details:</h6></div>
                {items}
            </div>
            <div className="bg-white">
                <div className="p-2 d-flex w-100 justify-content-between" style={{ height: '25%' }} >
                    <div className="p-2 d-flex w-100 justify-content-between" style={{ height: '25%' }} >
                        <div className="w-25">
                            <Box sx={{ '& button': { m: 1 } }}>

                                <Button style={{ color: 'green', width: '125%' }} value={orderDetails} onChange={handleorderdetails} onClick={addItem}>
                                    <AddIcon style={{ fontSize: '1.4em' }} />Add item</Button>

                            </Box>
                        </div>
                    </div>
                    <div classname='w-25'>
                        <Box component="form" className="w-25 ms-5"
                            sx={{ '& > :not(style)': { m: 1, width: '15ch' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                size="small" label="Shipping($)"
                                value={shippingvalue}
                                onChange={handlechangeshippingvalue}
                                variant="outlined" />
                        </Box>
                    </div>
                    <div className="w-25">
                        <Box component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '15ch' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                value={discountvalue}
                                onChange={handlechangediscountvalue}
                                size="small" label="Discount($)" variant="outlined" />
                        </Box>
                    </div>
                    <div className="w-25">
                        <Box component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '15ch' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                value={taxvalue}
                                onChange={handlechangetaxvalue}
                                size="small" label="Taxes(%)" variant="outlined" />
                        </Box>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{ width: '30%' }}>
                        <div className=''>Subtotal</div>
                        <div className='' style={{ width: '30%' }}>
                            {subtotal ? `$${subtotal}` : '-'}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{ width: '30%' }}>
                        <div className=''>Shipping</div>
                        <div className='ms-0    ' style={{ width: '30%' }}>
                            <div style={{color:'#00bf2d'}}>{shippingvalue ? `+$${shippingvalue}` : <span style={{ color: 'black' }}>-</span>}</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{ width: '30%' }}>
                        <div className=''>Discount</div>
                        <div className='' style={{ width: '30%' }}>
                           <div style={{color:'#ff5a36'}}> {discountvalue ? `-$${discountvalue}` : <span style={{ color: 'black' }}>-</span>}</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{ width: '30%' }}>
                        <div className=''>Taxes</div>
                        <div className='' style={{ width: '30%' }}>
                            <div style={{color:'#00bf2d'}}>{taxvalue ? `%$${taxvalue}` : <span style={{ color: 'black' }}>-</span>}</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{ width: '30%' }}>
                        <div className=''><b>Total</b></div>
                        <div className='' style={{ width: '30%' }}>
                            {overalltotal ? `$${overalltotal}` : '-'}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" p-4">
                <button type="button" class="btn btn-dark" style={{ marginLeft: "94%" }} onClick={save}>create</button>
            </div>
        </>

    )
}