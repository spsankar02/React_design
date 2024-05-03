import React, { useState } from "react";
import {Box,TextField} from '@mui/material';
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

export default function CreateInvoice() {

    // const [itemList, setItemList] = useState([])

    // const addItem = () => {
    //     let temp = [...itemList];
    //     temp.push(1)
    //     setItemList(temp)
    //     console.log(temp)
    // }

    const [itemList, setItemList] = useState([]);

    const addItem = () => {
      setItemList(prevList => [...prevList, 1]); // Add a new item (1 in this case)
    }
  
    const removeItem = () => {
      if (itemList.length > 0) {
        setItemList(prevList => prevList.slice(0, -1)); // Remove the last item from the array
      }
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


const dropdown = [
    {
      value: 'hr',
      label: 'HR manager',
    },
    {
      value: 'pm',
      label: 'Project manager',
    },
    {
      value: 'ud',
      label: 'UI/UX Designer',
    },
    {
      value: 'da',
      label: 'Data Analyst',
    },
  ];
  

    const items = itemList.map((item) => {
        return (
        <div className="d-flex justify-content-between"> 
        <div>
            <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                    <TextField
                    id="outlined-number"
                    label="Title"
                    size="small"
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </div>
            </Box>
        </div>
        <div>
            <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                    <TextField
                    id="outlined-number"
                    label="Description"
                    size="small"
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </div>
            </Box>
        </div>
        <div>
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off">
                <div>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Status"
                        size="small"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                            }}
                    >
                    {dropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                     ))}
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
                    InputLabelProps={{
                    shrink: true,
                    }}/>
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
                    InputLabelProps={{
                    shrink: true,
                    }}/>
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
                    InputLabelProps={{
                    shrink: true,
                    }}/>
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
                                <ModeEditIcon/>
                                </div>
                        </div>
                        <div className="ms-3">
                                    <h5><b>Jayvion Simon</b></h5>
                                    <h6>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</h6>
                                    <h6>365-374-4961</h6>
                                </div>
                    </div>              <hr className="dashed" />
         
                        <div className="w-40 bg-white">
                    <div className="d-flex justify-content-between ">
                            <div className="w-50 ms-3 mt-2">
                                <h3>To:</h3>
                            </div>
                            <div className="w-50 mt-3" style={{ marginLeft: '350px' }}>
                                <ModeEditIcon/>
                                </div>
                    </div>
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
            <div >
                <TextField
                    id="outlined-number"
                    label="Invoice number"
                    InputLabelProps={{
                    shrink: true,
                }}/>
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
                    >
                    {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
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
                />
            </DemoContainer>
         </LocalizationProvider>

        </div>
        <div className="w-25 p-2 ms-2 me-2 mt-1  mb-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="Due date" />
            </DemoContainer>
         </LocalizationProvider>
        </div>
    </div>

            <div className="p-3" style={{ backgroundColor: '#ffffff' }}>
                    <div><h6 className="">Details:</h6></div>
                    {items}
            </div>
                <div className="bg-white">
                    <div className="p-2 d-flex w-100 justify-content-between" style={{height:'25%'}} >
                        <div className="p-2 d-flex w-100 justify-content-between" style={{height:'25%'}} >
                            <div className="w-25"> 
                                <Box sx={{ '& button': { m: 1 } }}>
                                    
                                        <Button  style={{color:'green',width:'125%'}} onClick={addItem}>
                                        <AddIcon style={{fontSize:'1.4em'}}/>Add item</Button>
                                    
                                </Box>
                            </div>
                        </div> 
                    <div classname='w-25'>
                        <Box component="form" className="w-25 ms-5"
                            sx={{'& > :not(style)': { m: 1, width: '15ch' },}}
                            noValidate 
                            autoComplete="off">
                            <TextField id="outlined-basic" size="small" label="Shipping($)" variant="outlined" />
                        </Box>
                    </div>
                    <div className="w-25">
                        <Box component="form"
                            sx={{'& > :not(style)': { m: 1, width: '15ch' },}}
                            noValidate 
                            autoComplete="off">
                            <TextField id="outlined-basic" size="small" label="Discount($)" variant="outlined" />
                        </Box>
                    </div>
                    <div className="w-25">
                        <Box component="form"
                            sx={{'& > :not(style)': { m: 1, width: '15ch' },}}
                            noValidate 
                            autoComplete="off">
                            <TextField id="outlined-basic" size="small" label="Taxes(%)" variant="outlined" />
                        </Box>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{width:'25%'}}>
                        <div className=''>Subtotal</div>
                        <div className='' style={{width:'18%'}}>-</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{width:'25%'}}>
                        <div className=''>Shipping</div>
                        <div className='' style={{width:'18%'}}>-</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{width:'25%'}}>
                        <div className=''>Discount</div>
                        <div className='' style={{width:'18%'}}>-</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{width:'25%'}}>
                        <div className=''>Taxes</div>
                        <div className='' style={{width:'18%'}}>-</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-2 w-100">
                    <div className="w-75"></div>
                    <div className="d-flex justify-content-between" style={{width:'25%'}}>
                        <div className=''><b>Total</b></div>
                        <div className='' style={{width:'18%'}}>-</div>
                    </div>
                </div>
               </div>
            <div className=" p-4">
                <button type="button" class="btn btn-dark" style={{marginLeft:"94%"}}>create</button>
            </div>
        </>

    )
}