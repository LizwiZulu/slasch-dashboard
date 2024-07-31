import Head from 'next/head';
import {
  Box, Container, Stack, Typography, Grid, CircularProgress, Avatar, Card, Table,
  TableBody,
  TableCell,SvgIcon,
  TableContainer, TableHead,
  TableRow, Button, Modal
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuctionCard } from 'src/sections/auctions/auction-card';
import Pagination from '@mui/material/Pagination';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Auction } from 'src/sections/auctions/auction';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const id = router.query.id; // Business Id
  const userId = localStorage.getItem("userId");

  const [business, setBusiness] = useState();
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  console.log("Business Id:", id)

  useEffect(() => {
    const token = localStorage.getItem("myToken");

    setIsLoading(true);
    setError(null);

    const fetchBusiness = axios.get(`${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const fetchAuctions = axios.get(`${url}/${id}/auction`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    Promise.all([fetchBusiness, fetchAuctions])
      .then((responses) => {
        setBusiness(responses[0].data.business);
        setAuctions(responses[1].data.auctionData);
        setTotalPages(Math.ceil(responses[1].data.total / itemsPerPage));

        console.log("Fetched:", responses[1].data)
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, userId, page, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddButtonClicked = () => {
    setShowModal(true);
  };

  return (
    <>
      <Head>
        <title>Business details</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>

            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}

            {error && (
              <Typography variant="body2" color="error">
                Error fetching business: {error.message}
              </Typography>
            )}

            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                p: 2,
              }}
            >
              <Grid container alignItems="center">

                <Grid xs={12} md={6} lg={4}>
                  <Avatar
                    src={business?.BusinessLogo}
                    variant="rounded"
                    sx={{ width: 275, height: 275 }}
                  />
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                  <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>  <Typography color="text.secondary" variant="body2">
                              Business Name
                            </Typography></TableCell>
                            <TableCell>{business?.BusinessName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell> <Typography color="text.secondary" variant="body2">
                              Business Category
                            </Typography></TableCell>
                            <TableCell>{business?.BusinessCategory}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><Typography color="text.secondary" variant="body2">
                              Business Location
                            </Typography></TableCell>
                            <TableCell>{business?.BusinessLocation}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><Typography color="text.secondary" variant="body2">
                              Phone Number
                            </Typography></TableCell>
                            <TableCell>{business?.PhoneNumber}</TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Stack>
                </Grid>

              </Grid>
            </Card>


            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h5">Business Auctions</Typography>
               <div>
                <Button variant="contained" startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>} onClick={handleAddButtonClicked}>
                  New Auction
                </Button>
              </div> 
            </Stack> 

            {auctions.length > 0 && (
              <>
                <Grid container spacing={3}>
                  {auctions.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((auction, index) => (
                    <Grid xs={12} md={6} lg={4} key={auction._id}>
                      <AuctionCard
                        campaignName={auction.campaignName}
                        campaignDescription={auction.campaignDescription}
                        campaignBudget={auction.campaignBudget}
                        campaignDailyBudget={auction.campaignDailyBudget}
                        _id={auction._id}
                        businessId={business?._id}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                  />
                </Box>
              </>
            )}
          </Stack>
        </Container>
      </Box>
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContent>
            <Auction
            _id={business?._id} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;