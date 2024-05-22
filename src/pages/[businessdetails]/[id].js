import Head from 'next/head';
import { Box, Container, Stack, Typography, Grid, CircularProgress, Avatar, Card } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuctionCard } from 'src/sections/auctions/auction-card';
import Pagination from '@mui/material/Pagination';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const userId = localStorage.getItem("userId");

  const [business, setBusiness] = useState();
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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

    const fetchAuctions = axios.get(`${url}/${userId}/auction`, {
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
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, userId, page, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
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
                p: 2
              }}
            >
              <Stack direction="row" alignItems="flex-start" spacing={4}>
                <Grid xs={12} md={6} lg={6}>
                  <Avatar
                    src={business?.BusinessHours}
                    variant="rounded"
                    sx={{ width: 250, height: 250 }}
                  />
                </Grid>

                <Grid xs={12} md={6} lg={6}>
                  <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={1}>

                    <Typography color="text.secondary" variant="body2">Business Name</Typography>
                    <Typography variant="h6">{business?.BusinessName}</Typography>
                    <Typography color="text.secondary" variant="body2">Business Category</Typography>
                    <Typography variant="h6">{business?.BusinessCategory}</Typography>
                    <Typography color="text.secondary" variant="body2">Location</Typography>
                    <Typography variant="h6">{business?.BusinessLocation}</Typography>
                    <Typography color="text.secondary" variant="body2">Phone number</Typography>
                    <Typography variant="h6">{business?.PhoneNumber}</Typography>

                  </Stack>
                </Grid>
              </Stack>
            </Card>

            

            <Typography variant="h5">All business Auctions</Typography>

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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;