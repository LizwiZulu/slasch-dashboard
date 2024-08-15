import Head from 'next/head';
import PropTypes from 'prop-types';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
  Box, Container, Stack, Typography, Grid, CircularProgress, Avatar, Card, CardContent, Table,
  TableBody,
  Pagination,
  TableCell,SvgIcon,
  TableContainer, TableHead, InputLabel,
  TableRow, Button, Modal, FormControl,
  Tab, TextField,
  Alert
} from '@mui/material';
import axios from 'axios';
import { TabContext, TabList, Tabs, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { shadows } from '@mui/system';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import NativeSelect from '@mui/material/NativeSelect';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const aurl = 'https://adlinc-api.onrender.com/api/slaschapp/transaction/owner/requests';
const accUrl = 'https://adlinc-api.onrender.com/api/slaschapp/transaction/accounts';
const baseUrl = 'https://adlinc-api.onrender.com/api/slaschapp'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};


  const Page = () => {
    const [businesses, setBusinesses] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [accountTypes, setAccountTypes] = useState(['Savings', 'Cheque', 'Current']);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowForm, setShowForm] = useState(false);
    const [isShowCashOut, setShowCashOut] = useState(false);
    const [error, setError] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentTab, setCurrentTab] = useState('all');
    const [amount, setAmount] = useState('0');
    const [currentAccount, setCurrentAccount] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [accountName, setAccountName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [branchCode, setBranchCode] = useState('');

    const handlePageChange = (event, value) => {
      setPage(value);
    };
    const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue);
    };

    const handleToggleShowForm = (event, newValue) => {
      console.log("I am here .............", newValue)
      setShowForm(newValue);
    }

    const getAccounts = () => {
      const token = localStorage.getItem("myToken");
      const userID = localStorage.getItem('userId');
      setIsLoading(true);
        setError(null);
      axios.get(`${accUrl}/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          setAccounts(response.data.bank_accounts);
         // console.log("Fetched Accounts:", response.data);
          setCurrentAccount(response.data.bank_accounts[0]._id)
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    useEffect(() => {
      const token = localStorage.getItem("myToken");
      const userID = localStorage.getItem('userId');
      getAccounts()
      if (token) {
        setIsLoading(true);
        setError(null);
        axios.get(`${aurl}/${userID}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            setBusinesses(response.data.requests);
            setTotalPages(Math.ceil(response.data.total / itemsPerPage));
            //console.log("Fetched business:", response.data);
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }

      

    }, [page, itemsPerPage]);

    const handleSubmitRequest = (event) => {
      const token = localStorage.getItem("myToken");
      const userID = localStorage.getItem('userId');
      event.preventDefault();

      axios.post(`${baseUrl}/transaction/account/${currentAccount}/create/request/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Auction created successfully!');
          if(response.status == 200){
            window.location.reload()
          } else {
            Alert('There was an error please try again')
          }
        })
        .catch((error) => {
          console.error('Error creating business:', error);
        });
      
    };

    const handleSubmitNewBank = (event) => {
      const token = localStorage.getItem("myToken");
      const userID = localStorage.getItem('userId');
      event.preventDefault();

      axios.post(`${baseUrl}/transaction/create/account/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Auction created successfully!');
          if(response.status == 200){
            window.location.reload()
          } else {
            Alert('There was an error please try again')
          }
        })
        .catch((error) => {
          console.error('Error creating business:', error);
        });
      
    };

    const handleCurrentAccount = (e) => {
      accounts.push(e.target.value.accountName)
      setCurrentAccount(e.target.value._id)
    }

    return(
        <>
        <Head>Slasch Wallet</Head>
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <Card sx={{ height: '100%' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid  item xs={12} sm={6}>
            <Typography variant="h5" component="h2" gutterBottom>
          Current Balance
        </Typography>
        <p>R {localStorage.getItem('wallet')}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" onClick={(e) => {setShowForm(true)}}>Transfer to Account</Button>
            </Grid>



          </Grid>
          { isShowForm ?
            <form>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="Amount"
                name="Amount"
                label="Transfer Amount"
                value={amount}
                onChange={(event) => {setAmount(event.target.value)}}
                fullWidth
              />
            </Grid>
              <Grid item xs={2} my={1}>
                <Button type="submit" variant="contained" color="success" fullWidth>
                  Transfer to Wallet
                </Button>
              </Grid>
              <Grid item xs={2} my={1}>
                <Button variant="outlined" color="error" fullWidth onClick={(e)=>{setShowForm(false)}}>
                 Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
          :<></>
          }
      
        </CardContent>
        </Card>
            </Grid>

            <Grid item xs={12} sm={12}>
            <Card sx={{ height: '100%' }}>
        <CardContent>
      

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <TabContext value={currentTab}>
            <Grid container spacing={2}>
            <Grid  item xs={12} sm={6}>
            <Typography variant="h5">Cash out Requests</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" onClick={(e)=>{setShowCashOut(true)}}>Request Cash Out</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" onClick={(e)=>{setShowModal(true)}}>Add Bank Account</Button>
            </Grid>
          </Grid>
              <Card container sx={{
                  flexGrow: 1,
                  py: 2
                  
                }} >
                <TabList onChange={handleTabChange} sx={{
                  flexGrow: 1,
                  px: 4

                }}>
                  <Tab label="All" value="all" />
                  <Tab label="Completed" value="Completed" />
                  <Tab label="Declined" value="Declined" />
                  <Tab label="Pending" value="Pending" />
                </TabList>

                <TabPanel value="all">
                  {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  )}
                  {error && (
                    <Typography variant="body2" color="error">
                      Error fetching requests: {error.message}
                    </Typography>
                  )}
                  {businesses.length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Request Amount</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id}>
                              <TableCell>R {business?.Amount}</TableCell>
                              <TableCell>{business?.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(businesses.length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      size="small"
                    />
                  </Box>

                  {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                  />
                </Box> */}
                </TabPanel>

                <TabPanel value="Active">
                  {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  )}
                  {error && (
                    <Typography variant="body2" color="error">
                      Error fetching Requests: {error.message}
                    </Typography>
                  )}
                  {businesses.filter((business) => business.status === 'Complete').length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                          <TableCell>Request Amount</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.filter((business) => business.status === 'Complete').slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id}>
                            <TableCell>{business?.Amount}</TableCell>
                            <TableCell>{business?.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(businesses.filter((business) => business.status === 'Complete').length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      size="small"
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="Revoked">
                  {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  )}
                  {error && (
                    <Typography variant="body2" color="error">
                      Error fetching businesses: {error.message}
                    </Typography>
                  )}
                  {businesses.filter((business) => business.status === 'Declined').length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Request Amount</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.filter((business) => business.status === 'Declined').slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id}>
                            <TableCell>{business?.Amount}</TableCell>
                            <TableCell>{business?.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  
                </TabPanel>
                <TabPanel value="Pending">
                  {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  )}
                  {error && (
                    <Typography variant="body2" color="error">
                      Error fetching businesses: {error.message}
                    </Typography>
                  )}
                  {businesses.filter((business) => business.status === 'Pending').length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Request Amount</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.filter((business) => business.status === 'Pending').slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id}>
                            <TableCell>{business?.Amount}</TableCell>
                            <TableCell>{business?.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(businesses.filter((business) => business.status === 'Pending').length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      size="small"
                    />
                  </Box>
                </TabPanel>
              </Card>
            </TabContext>

          </Stack>
        </Container>

        {
          isShowCashOut 
          ? <form onSubmit={handleSubmitRequest}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3} my={1}>
              <FormControl sx={{ m: 1, width: 210 }}>
        <InputLabel id="demo-multiple-checkbox-label">Account</InputLabel>
        <NativeSelect
                  defaultValue={''}
                  onChange={(e)=>{handleCurrentAccount(e)}}
                  inputProps={{
                    name: "Account",
                    id: "demo-multiple-checkbox"
                  }}
                >
                 {accounts.map((name) => (
            <option key={name._id} value={name._id}>
              {name.accountName}
            </option>
          ))}
                </NativeSelect>
       
      </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={3} my={2}>
              <TextField
                required
                id="Amount"
                name="Amount"
                label="Transfer Amount"
                value={amount}
                onChange={(event) => {setAmount(event.target.value)}}
                fullWidth
              />
            </Grid>

            <Grid item xs={2} my={3}>
                <Button type="submit" variant="contained" color="success" fullWidth>
                 Submit Request
                </Button>
              </Grid>
              <Grid item xs={2} my={3}>
                <Button variant="outlined" color="error" fullWidth onClick={(e)=>{setShowCashOut(false)}}>
                 Cancel
                </Button>
                </Grid>
            </Grid>

      
          </form>
          : <></>
        }


        </CardContent>
        </Card>
            </Grid>
          </Grid>
        
        </Box>
        {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContent>
           <form onSubmit={handleSubmitNewBank}>
           <Typography variant="h5" component="h2" gutterBottom>
          Add New Bank Account
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
          <TextField
                required
                id="AccountName"
                name="AccountName"
                label="Account Name"
                value={accountName}
                onChange={(event) => {}}
                fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={12}>
          <TextField
                required
                id="BankName"
                name="BankName"
                label="Bank Name"
                value={bankName}
                onChange={(event) => {}}
                fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={12}>
          <TextField
                required
                id="AccountNumber"
                name="AccountNumber"
                label="Account Number"
                value={accountNumber}
                onChange={(event) => {}}
                fullWidth
              />
          </Grid>

          <Grid  item xs={12} sm={12}>
          <FormControl sx={{ m: 1, width: 210 }}>
        <InputLabel id="demo-multiple-checkbox-label">Account Type</InputLabel>
        <NativeSelect
                  defaultValue={''}
                  onChange={(e)=>{setAccountType(e.target.value)}}
                  inputProps={{
                    name: "Account-Type",
                    id: "Account-type"
                  }}
                >
                 {accountTypes.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
                </NativeSelect>
       
      </FormControl>
          </Grid>

        <Grid item xs={12} sm={12}>
            
              
              <TextField
                required
                id="BranchCode"
                name="BranchCode"
                label="Branch Code"
                value={branchCode}
                onChange={(event) => {}}
                fullWidth
              />
            </Grid>

            <Grid item xs={6} my={3}>
                <Button type="submit" variant="contained" color="success" fullWidth>
                Add Account
                </Button>
              </Grid>
              <Grid item xs={6} my={3}>
                <Button variant="outlined" color="error" fullWidth onClick={(e)=>{setShowModal(false)}}>
                 Cancel
                </Button>
                </Grid>
        </Grid>


           </form>
          </DialogContent>
        </Dialog>
      )}
        </>
    )}


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;