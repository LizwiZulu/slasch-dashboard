import Head from 'next/head';
import {
  Box,
  Avatar,
  Button,
  Container,
  Pagination,
  Stack,
  Typography,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab, Card, CardHeader
} from '@mui/material';

import { TabContext, TabList, Tabs, TabPanel } from '@mui/lab';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PlusIcon } from '@heroicons/react/24/solid';
import UserProfileAdmin from './businessdetails/business-details-admin';


const aurl = 'https://adlinc-api.onrender.com/api/slaschapp/admin/businesses';


const Page = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBusiness, setIsShowBusiness] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    console.log("My token..............", localStorage.getItem("myToken"))
    if (token) {
      setIsLoading(true);
      setError(null);
      axios.get(`${aurl}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          setBusinesses(response.data.businesses);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
          console.log("Fetched business:", response.data.businesses);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, itemsPerPage]);

 

  const handlePageChange = (event, value) => {
    setPage(value);
  };



  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleViewBusiness = (e, newBusiness) => {
    console.log("this is it ..... ", newBusiness)
    setCurrentBusiness(newBusiness);
    setIsShowBusiness(true);
  };

  return (
    <>
      <Head>
        <title>Businesses</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>

            <TabContext value={currentTab}>

              <Typography variant="h5">All Businesses</Typography>

              <Card container sx={{
                  flexGrow: 1,
                  py: 2
                  
                }} >
                <TabList onChange={handleTabChange} sx={{
                  flexGrow: 1,
                  px: 4

                }}>
                  <Tab label="All Businesses" value="all" />
                  <Tab label="Active" value="Active" />
                  <Tab label="Inactive" value="Revoked" />
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
                      Error fetching businesses: {error.message}
                    </Typography>
                  )}
                  {businesses.length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Business Category</TableCell>
                            <TableCell>Business Location</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id} onClick={(e)=>{handleViewBusiness(e, business)}}>
                              <TableCell>
                              <Avatar src={business?.BusinessLogo}>
                        </Avatar>
                              </TableCell>
                              <TableCell>{business?.BusinessName}</TableCell>
                              <TableCell>{business?.BusinessCategory}</TableCell>
                              <TableCell>{business?.BusinessLocation}</TableCell>
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
                </TabPanel>

                <TabPanel value="Active">
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
                  {businesses.filter((business) => business.status === 'Active').length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Business Category</TableCell>
                            <TableCell>Business Location</TableCell>
                            <TableCell>Business Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.filter((business) => business.status === 'Active').slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id} onClick={(e)=>{handleViewBusiness(e, business)}}>
                              <TableCell>
                              <Avatar src={business?.BusinessLogo}>
                        </Avatar>
                              </TableCell>
                               <TableCell>{business?.BusinessName}</TableCell>
                              <TableCell>{business?.BusinessCategory}</TableCell>
                              <TableCell>{business?.BusinessLocation}</TableCell>
                              <TableCell>{business?.BusinessType}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(businesses.filter((business) => business.status === 'Active').length / itemsPerPage)}
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
                  {businesses.filter((business) => business.status === 'Inactive').length >= 0 && (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Business Category</TableCell>
                            <TableCell>Business Location</TableCell>
                            <TableCell>Business Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.filter((business) => business.status === 'Revoked').slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id} onClick={(e)=>{handleViewBusiness(e, business)}}>
                              <TableCell>
                              <Avatar src={business?.BusinessLogo}>
                        </Avatar>
                              </TableCell>
                              <TableCell>{business?.BusinessName}</TableCell>
                              <TableCell>{business?.BusinessCategory}</TableCell>
                              <TableCell>{business?.BusinessLocation}</TableCell>
                              <TableCell>{business?.BusinessType}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(businesses.filter((business) => business.status === 'Revoked').length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      size="small"
                    />
                  </Box>
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
                            <TableCell></TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Business Category</TableCell>
                            <TableCell>Business Location</TableCell>
                            <TableCell>Business Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {businesses.filter((business) => business.status === 'Pending').slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business) => (
                            <TableRow key={business?._id} onClick={(e)=>{handleViewBusiness(e, business)}}>
                              <TableCell>
                              <Avatar src={business?.BusinessLogo}>
                        </Avatar>
                              </TableCell>
                              <TableCell>{business?.BusinessName}</TableCell>
                              <TableCell>{business?.BusinessCategory}</TableCell>
                              <TableCell>{business?.BusinessLocation}</TableCell>
                              <TableCell>{business?.BusinessType}</TableCell>
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
      </Box>
      {isShowBusiness && (
        <UserProfileAdmin business = {currentBusiness}></UserProfileAdmin>
      )}

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;