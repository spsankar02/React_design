import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import BillingService from "../../Services/BillingService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import moment from 'moment';


export default function Invoice() {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [value, setValue] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const state = location.state;
    if (state && state.successMessage) {
      setSuccessMessage(state.successMessage);
    }
  }, [location.state]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    BillingService.getallinvoice()
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const handlechangepage = (e, newpage) => {
    setPage(newpage);
  }

  const handlechangerow = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  }

  const handleeditinvoice = (id) => {
    navigate(`/home/invoice/editinvoice/${id}`);
  }

  const deleteAndShowSnackbar = async (id) => {
    try {
      deleteinvoice(id);
      handleCloseSnackbar();
      handleOpenSnackbar();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteinvoice = (id) => {
    const payload = { id };

    BillingService.deleteinvoice(payload)
      .then((res) => {
        setInvoice(invoice.filter((invoice) => invoice.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting billing:", error);
      });
  };

  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleviewinvoice = (id) => {
    navigate(`viewinvoice/${id}`);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const appliedFilters = ({ startDate, endDate, searchTerm }) => {
    let filteredInvoices = invoice.filter((inv) => {
      if (startDate && !moment(inv.createdDate).isSameOrAfter(startDate, 'day')) {
        return false;
      }
      return true;
    });
    // Filter invoices based on endDate
    filteredInvoices = filteredInvoices.filter((inv) => {
      if (endDate && !moment(inv.dueDate).isSameOrBefore(endDate, 'day')) {
        return false;
      }
      return true;
    });

    // Filter invoices based on searchTerm
    filteredInvoices = filteredInvoices.filter((inv) => {
      if (
        searchTerm &&
        (
          (typeof inv.order.user.customerName === 'string' && !inv.order.user.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (typeof inv.id === 'string' && !inv.id.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      ) {
        return false;
      }
      return true;
    });

    // Return the filtered invoices
    return filteredInvoices;
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    appliedFilters({ startDate: newDate, endDate, searchTerm });
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    appliedFilters({ startDate, endDate: newDate, searchTerm });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    appliedFilters({ startDate, endDate, searchTerm: event.target.value });
  };

  const handleDeleteChip = (chipType) => {
    switch (chipType) {
      case 'startDate':
        setStartDate(null);
        appliedFilters({ startDate: null, endDate, searchTerm });
        break;
      case 'endDate':
        setEndDate(null);
        appliedFilters({ startDate, endDate: null, searchTerm });
        break;
      case 'searchTerm':
        setSearchTerm('');
        appliedFilters({ startDate, endDate, searchTerm: '' });
        break;
      default:
        break;
    }
  };


  // const handleSearchTermChange = (newValue) => {
  //   setSearchTerm(newValue);
  //   setAppliedFilters(currentFilters => {
  //     const newFilters = currentFilters.filter(filter => filter.key !== 'Search Term');
  //     if (newValue) {
  //       newFilters.push({ key: 'Search Term', value: newValue });
  //     }
  //     return newFilters;
  //   });
  // };

  // const handleDeleteFilter = (filterToDelete) => {
  //   setAppliedFilters(appliedFilters.filter((filter) => filter.key !== filterToDelete.key));
  //   if (filterToDelete.key === 'Start Date') setStartDate(null);
  //   if (filterToDelete.key === 'End Date') setEndDate(null);
  //   if (filterToDelete.key === 'Search Term') setSearchTerm('');
  // };


  const getFilteredInvoices = () => {
    let filtered = invoice;

    if (value !== "1") {
      filtered = filtered.filter(details => details.status.toLowerCase() === value.toLowerCase());
    }

    if (startDate) {
      filtered = filtered.filter(details => new Date(details.createdDate) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(details => new Date(details.createdDate) <= new Date(endDate));
    }

    if (searchTerm) {
      filtered = filtered.filter(details =>
        details.order.user.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        details.id.toString().includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredInvoices = getFilteredInvoices();

  return (
    <>
      <div className="d-flex justify-content-between" style={{ height: '10%' }}>
        <div>
          <b><h2 style={{fontFamily:'Brandon Grotesque Black',fontWeight:'bolder'}}>List</h2></b>
        </div>
        <div>
          <Link to='newinvoice' className="text-black" style={{ textDecoration: 'none' }}>
            <button type="button" className="btn btn-dark">
              <i className="bi bi-plus" style={{ fontSize: '1.0em' }}></i>New Invoice
            </button>
          </Link>
        </div>
      </div>
      <Paper>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label={
                  <span>
                    <span style={{ verticalAlign: 'middle',color:'black' }}>All</span>
                    <Box sx={{ display: 'inline-block',backgroundColor:'#30302f',color:'white',  marginLeft:'3px',padding: '2px 6px', borderRadius: '4px', textAlign: 'center' }}>
                      <span style={{ verticalAlign: 'middle', marginLeft: '2px' }}>{invoice.length}</span>
                    </Box>
                  </span>
                } value="1" />
                <Tab label={
                  <span>
                    <span style={{ verticalAlign: 'middle',color:'black' }}>Paid</span>
                    <Box sx={{ display: 'inline-block',backgroundColor:'#daffd4',color:'#16a300', border: '', marginLeft:'3px',padding: '2px 6px', borderRadius: '4px', textAlign: 'center' }}>
                      <span style={{ verticalAlign: 'middle', marginLeft: '1px' }}>
                      {invoice.filter(inv => inv.status.includes('Paid')).length}</span>
                    </Box>
                  </span>
                } 
                value="Paid" />
                <Tab label={
                  <span>
                    <span style={{ verticalAlign: 'middle',color:'black' }}>Pending</span>
                    <Box sx={{ display: 'inline-block',backgroundColor:'#fce6a9',color:'#916901', border: '', marginLeft:'3px',padding: '2px 6px', borderRadius: '4px', textAlign: 'center' }}>
                      <span style={{ verticalAlign: 'middle', marginLeft: '1px' }}>
                      {invoice.filter(inv => inv.status.includes('Pending')).length}</span>
                    </Box>
                  </span>
                }  
                value="Pending" />
                <Tab label={
                  <span>
                    <span style={{ verticalAlign: 'middle',color:'black' }}>Overdue</span>
                    <Box sx={{ display: 'inline-block',backgroundColor:'#fcb7a9',color:'#9e1b00', border: '', marginLeft:'3px',padding: '2px 6px', borderRadius: '4px', textAlign: 'center' }}>
                      <span style={{ verticalAlign: 'middle', marginLeft: '1px' }}>
                      {invoice.filter(inv => inv.status.includes('Overdue')).length}</span>
                    </Box>
                  </span>
                }   
                value="Overdue" />
                <Tab label={
                  <span>
                    <span style={{ verticalAlign: 'middle',color:'black' }}>Draft</span>
                    <Box sx={{ display: 'inline-block',backgroundColor:'#c9c9c9',color:'#6e6e6e', border: '', marginLeft:'3px',padding: '2px 6px', borderRadius: '4px', textAlign: 'center' }}>
                      <span style={{ verticalAlign: 'middle', marginLeft: '1px' }}>
                      {invoice.filter(inv => inv.status.includes('Draft')).length}</span>
                    </Box>
                  </span>
                }    
                value="Draft" />
              </TabList>
            </Box>
            {/* <TabPanel value="1"></TabPanel> 
            <TabPanel value="Paid"></TabPanel> 
            <TabPanel value="Pending"></TabPanel> 
            <TabPanel value="Overdue"></TabPanel> 
            <TabPanel value="Draft"></TabPanel> */}
          </TabContext>
        </Box>
      </Paper>
      <Paper className="mb-5">
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
                <TableCell><Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { mt: 3, mb: 2, ml: 1, width: '48ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-number"
                    placeholder="Search customer or Invoice number"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <SearchIcon />,
                    }}
                  />
                </Box></TableCell>
              </TableRow>

              <TableRow>
                {(startDate || endDate || searchTerm) && (
                  <TableCell colSpan={4}>
                    <div className="mb-2"><b>{filteredInvoices.length}</b> <span style={{color:'#787878'}}>results found</span></div>
                    {startDate && (
                      <Chip
                        label={`Start Date: ${startDate.format('MM/DD/YYYY')}`}
                        onDelete={() => handleDeleteChip('startDate')}
                      />
                    )}
                    {endDate && (
                      <Chip
                        label={`End Date: ${endDate.format('MM/DD/YYYY')}`}
                        onDelete={() => handleDeleteChip('endDate')}
                      />
                    )}
                    {searchTerm && (
                      <Chip
                        label={`Search: ${searchTerm}`}
                        onDelete={() => handleDeleteChip('searchTerm')}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: '#f4ebff' }}>
              <TableRow>
                <TableCell><Checkbox /></TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Create</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Sent</TableCell>
                <TableCell>Status</TableCell>
                <TableCell><div style={{ marginLeft: '38%' }}>Actions</div></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(details => (
                  <TableRow key={details.id} className="tabbod">
                    <TableCell><Checkbox /></TableCell>
                    <TableCell style={{ width: '17%' }}>
                      <div>{details.order.user.customerName}</div>
                      <div>INV-{details.id}</div>
                    </TableCell>
                    <TableCell>{details.createdDate}</TableCell>
                    <TableCell>{details.dueDate}</TableCell>
                    <TableCell style={{ width: '12%' }}>{details.amount}</TableCell>
                    <TableCell style={{ width: '7%' }}>{details.order.items}</TableCell>
                    <TableCell style={{ width: '12%' }}>
                      {details.status.includes('Paid') ? (
                        <Box size="small" borderRadius="6px" style={{ color: 'green', backgroundColor: '#c5fcd4', width: '50%' }}>
                          <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Paid</p>
                        </Box>
                      ) : details.status.includes('Overdue') ? (
                        <Box size="small" borderRadius="6px" style={{ color: '#ff1605', backgroundColor: '#d48f8a', width: '72%' }}>
                          <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Overdue</p>
                        </Box>
                      ) : details.status.includes('Pending') ? (
                        <Box size="small" borderRadius="6px" style={{ color: '#a18600', backgroundColor: '#e8c78e', width: '72%' }}>
                          <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Pending</p>
                        </Box>
                      ) : details.status.includes('Draft') ? (
                        <Box size="small" borderRadius="6px" style={{ color: '#8c8c8b', backgroundColor: '#f2f1ed', width: '50%' }}>
                          <p className="mb-0 ms-2" style={{ fontSize: '0.9em' }}>Draft</p>
                        </Box>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Button style={{ color: "#a3a2a2" }} onClick={() => handleeditinvoice(details.id)}>
                        <ModeEditIcon />
                      </Button>
                      <Button onClick={() => handleviewinvoice(details.id)} style={{ color: "#a3a2a2" }}>
                        <VisibilityIcon />
                      </Button>
                      <Button style={{ color: '#f77272' }} onClick={() => handleOpenDialog(details.id)}><DeleteIcon /></Button>
                      <Dialog
                        open={openDialog === details.id}
                        style={{ backgroundColor: 'transparent' }}
                        backdropStyle={{ backgroundColor: 'lightpink' }}
                        onClose={handleCloseDialog}
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
                          <Button style={{ color: '#f74343' }} onClick={() => deleteAndShowSnackbar(details.id)}>Delete</Button>
                          <Button style={{ color: '#969696' }} onClick={handleCloseDialog} autoFocus>
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
          count={filteredInvoices.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handlechangerow} />
      </Paper>

      {successMessage && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
          <Alert onClose={() => setSuccessMessage('')} severity="success" variant="filled">
            {successMessage}
          </Alert>
        </Snackbar>)}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
          Invoice deleted successfully!
        </Alert>
      </Snackbar>

    </>
  );
}
