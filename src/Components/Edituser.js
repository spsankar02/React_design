import React, { useEffect } from "react";
import { Box, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from "react";
import Button from "@mui/material/Button";
import BillingService from "../Services/BillingService";
import { useNavigate } from "react-router-dom";
import {useParams } from "react-router-dom";



export default function Edituser(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const [country,setCountry] = useState("")
    const [role, setRole] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        BillingService.getalluser()
            .then((res) => {
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    useEffect(() => {
        console.log(id)
            BillingService.getuserbyid(id)
                .then((res) => {
                    const details = res.data;
                    setCustomerName(details.customerName);
                    setAddress(details.address);
                    setCity(details.city);
                    setCountry(details.country);
                    setState(details.state);
                    setCompanyName(details.companyName);
                    setEmailAddress(details.emailAddress);
                    setPhoneNo(details.phoneNo);
                    setPincode(details.pincode);
                    setRole(details.role);
                })
                .catch((error) => {
                    console.error('Error updating details:', error);
                });
        
    }, [id]);
    
    const Updateuser = (e) => {
        e.preventDefault();
        const updatedDetails = {
            id: id,
            customerName: customerName,
            emailAddress: emailAddress,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
            role: role,
            companyName: companyName,
            phoneNo: phoneNo
        };
    
        BillingService.updateuser(updatedDetails)
            .then((res) => {
                console.log('Billing updated successfully:', res);
                navigate('/user');
            })
            .catch((error) => {
                console.error('Error updating billing:', error);
                // Handle error scenarios, such as displaying error messages to the user
            });
    };
    
    


    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };
    return (
        <>
            <div className="mb-3 "><h4>Edit</h4></div>

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
                                            onChange={(e)=>setCustomerName(e.target.value)}
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
                                            onChange={(e)=>setEmailAddress(e.target.value)}
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
                                            onChange={(e)=>setPhoneNo(e.target.value)}
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
                                            value={country}
                                            onChange={(e)=>setCountry(e.target.value)}
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
                                            onChange={(e)=>setState(e.target.value)}
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
                                            onChange={(e)=>setCity(e.target.value)}
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
                                            onChange={(e)=>setAddress(e.target.value)}
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
                                            onChange={(e)=>setPincode(e.target.value)}
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
                                            onChange={(e)=>setCompanyName(e.target.value)}
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
                                            onChange={(e)=>setRole(e.target.value)}
                                            InputLabelProps={{ required: false }} />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="w-50">
                            {/* {error && <div className="ms-3" style={{ color: 'red' }}>{error}</div>} */}
                        </div>
                        <div className="w-50" >
                            <button style={{marginLeft:'57%'}} type="button" class="btn btn-dark" onClick={Updateuser} >Save Changes</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}