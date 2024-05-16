import React from "react";
import { Box, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import BillingService from "../../Services/BillingService";


export default function Newuser(props) {

    const [isNewUserClicked, setIsNewUserClicked] = useState(false);


    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const [setCountry] = useState("")
    const [role, setRole] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")


  

    const save = (e) => {
        e.preventDefault();
        const user = {
            customerName: customerName,
            emailAddress: emailAddress,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            country: "India",
            role: role,
            companyName: companyName,
            phoneNo: phoneNo
        }

        if (!customerName.trim() || !emailAddress.trim() || !address.trim() || !city.trim() || !state.trim() || !pincode.trim() || !role.trim() || !companyName.trim() || !phoneNo.trim()) {
            setIsNewUserClicked(true);
        } else {
            BillingService.createBilling(user).then(() => {
                navigate('/home/user', { state: { successMessage: 'User added successfully!' } });
            })
        }
    }


    const isfullnamevalid=customerName.trim() !=='' || !isNewUserClicked;
    const isPhoneNoValid = phoneNo.trim() !== '' || !isNewUserClicked;
    const isemailvalid=customerName.trim() !=='' || !isNewUserClicked;
    const isaddressvalid=address.trim() !=='' || !isNewUserClicked;
    const iscityvalid=city.trim() !=='' || !isNewUserClicked;
    const isstatevalid=state.trim() !=='' || !isNewUserClicked;
    const ispincodevalid=pincode.trim() !=='' || !isNewUserClicked;
    const isrolevalid=role.trim() !=='' || !isNewUserClicked;
    const iscompanyvalid=companyName.trim() !=='' || !isNewUserClicked;



   


    const changecustomernamehandler = (e) => {
        setCustomerName(e.target.value)
        // setError('name is required');
    }

    const changeemailaddresshandler = (e) => {
        setEmailAddress(e.target.value)
        // setError('email is required');
    }

    const changeaddresshandler = (e) => {
        setAddress(e.target.value)
        // setError('address is required');
    }

    const changecityhandler = (e) => {
        setCity(e.target.value)
        // setError('city is required');
    }

    const changestatehandler = (e) => {
        setState(e.target.value)
        // setError('state is required');
    }

    const changepincodehandler = (e) => {
        setPincode(e.target.value)
        // setError('pincode is required');
    }

    const changecountryhandler = (e) => {
        setCountry(e.target.value)
    }

    const changerolehandler = (e) => {
        setRole(e.target.value)
        // setError('role is required');
    }

    const changecompanynamehandler = (e) => {
        setCompanyName(e.target.value)
        // setError('company is required');
    }

    const changephonenohandler = (e) => {
        setPhoneNo(e.target.value)
        // setError('phoneno is required');
    }

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };



    return (
        <>
            <div className="mb-3 "><h4>Create a new User</h4></div>

            <div className="d-flex justify-content-between mt-4 w-100 rounded" style={{ height: '120%' }}>
                <div className="p-2 rounded bg-white" style={{ width: '36%', height: '80%' }}>
                    <div className="pt-5 pb-4 ps-3 pe-3" style={{ height: '96%' }}>
                        <div className="w-50 rounded" style={{ marginLeft: '20%', height: '50%' }}>
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChange} />

                            <Button
                                className="button-image"
                                component="div"
                                onClick={() => {
                                    document.querySelector('input[type="file"]').click();
                                }}
                                sx={{
                                    width: '180px',
                                    height: '180px',
                                    backgroundColor: 'lightgrey',
                                    borderRadius: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}>
                                {file ? ( // Render selected image if file exists
                                    <img src={file} alt='' style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    <div className="p-4 w-100" style={{ height: '60%' }}>
                                        <AddAPhotoIcon style={{ marginLeft: '37%', marginBottom: '5%', color: '#a1a1a1' }} />
                                        <p style={{ marginLeft: '10%', fontSize: '0.8em', color: '#a1a1a1' }}>upload photo</p>
                                    </div>
                                )}

                            </Button>
                        </div>
                        <div className="mt-5 ms-5">Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /><div className="ms-5"> max size of 3 Mb</div></div>
                    </div>
                </div>

                <div className="p-3  rounded bg-white" style={{ width: '62%', height: '80%' }}>
                    <div className="m-2" style={{ height: '15%' }}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required='true'
                                            label="Full Name"
                                            value={customerName}
                                            error={!isfullnamevalid} 
                                            helperText={!isfullnamevalid && isNewUserClicked ? 'Name is required' : ''}
                                            onChange={changecustomernamehandler}
                                            InputLabelProps={{ required: false }}
                                        />
                                    </div>
                                </Box>
                            </div>
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required
                                            label="Email Address"
                                            value={emailAddress}
                                            error={!isemailvalid} // Set error prop based on validation
                                            helperText={!isemailvalid && isNewUserClicked ? 'Email is required' : ''}
                                            onChange={changeemailaddresshandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="m-2" style={{ height: '15%' }}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required='true'
                                            label="Phone Number"
                                            value={phoneNo}
                                            error={!isPhoneNoValid} // Set error prop based on validation
                                            helperText={!isPhoneNoValid && isNewUserClicked ? 'Phone number is required' : ''} // Show helper text if validation fails after button click
                                            onChange={changephonenohandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required='true'
                                            label="Country"
                                            defaultValue={"India"}
                                            // value={country}
                                            onChange={changecountryhandler}
                                            InputLabelProps={{ shrink: true, required: false }} />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="m-2" style={{ height: '15%' }}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required='true'
                                            label="State/Region"
                                            value={state}
                                            error={!isstatevalid} // Set error prop based on validation
                                            helperText={!isstatevalid && isNewUserClicked ? 'State is required' : ''}
                                            onChange={changestatehandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required
                                            label="City"
                                            value={city}
                                            error={!iscityvalid} 
                                            helperText={!iscityvalid && isNewUserClicked ? 'City is required' : ''}
                                            onChange={changecityhandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="m-2" style={{ height: '15%' }}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required='true'
                                            label="Address"
                                            value={address}
                                            error={!isaddressvalid} 
                                            helperText={!isaddressvalid && isNewUserClicked ? 'Address is required' : ''}
                                            onChange={changeaddresshandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required
                                            label="Zip/Code"
                                            value={pincode}
                                            error={!ispincodevalid} 
                                            helperText={!ispincodevalid && isNewUserClicked ? 'Pincode is required' : ''}
                                            onChange={changepincodehandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="m-2" style={{ height: '15%' }}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required='true'
                                            label="Company"
                                            value={companyName}
                                            error={!iscompanyvalid} 
                                            helperText={!iscompanyvalid && isNewUserClicked ? 'Company name is required' : ''}
                                            onChange={changecompanynamehandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                            <div className="w-50">
                                <Box component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '95%' }, }}
                                    noValidate
                                    autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-number"
                                            size="small"
                                            required
                                            label="Role"
                                            value={role}
                                            error={!isrolevalid} 
                                            helperText={!isrolevalid && isNewUserClicked ? 'Role is required' : ''}
                                            onChange={changerolehandler}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="w-50">
                        </div>
                        <div className="w-50" >
                            <button style={{ marginLeft: '57%' }} type="button" class="btn btn-dark" onClick={save}>Create user</button>
                            {/* <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top', // Change 'top' to 'bottom' if you want the Snackbar to appear at the bottom
                                    horizontal: 'right', // Change 'right' to 'left' if you want the Snackbar to appear on the left
                                }}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="success"
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    User Added successfully!
                                </Alert>
                            </Snackbar> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}