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


const aurl = 'https://adlinc-api.onrender.com/api/slaschapp/admin/cash-out/requests';

const Page = () => {
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
          setBusinesses(response.data.cash_out);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
          console.log("Fetched business:", response.data);
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

  return (
    <>
      <Head>
        <title>Cash Outs</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>



            <TabContext value={currentTab}>

              <Typography variant="h5">All Cash out Requests</Typography>

              <Card container sx={{
                  flexGrow: 1,
                  py: 2
                  
                }} >
                <TabList onChange={handleTabChange} sx={{
                  flexGrow: 1,
                  px: 4

                }}>
                  <Tab label="All Businesses" value="all" />
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
                      Error fetching businesses: {error.message}
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
                      Error fetching businesses: {error.message}
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
      </Box>

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;