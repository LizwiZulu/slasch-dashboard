import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  CircularProgress,
  Avatar,
  Card,
  Pagination,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BaitplantCard } from 'src/sections/baitplants/baitplant-card';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/';

const Page = () => {
  const router = useRouter();
  const id = router.query.id; // Auction ID
  const userId = localStorage.getItem('userId');

  const [auction, setAuction] = useState(null);
  const [baits, setBaits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const token = localStorage.getItem('myToken');

    setIsLoading(true);
    setError(null);

    const fetchAuction = axios.get(`${url}business/${userId}/auction/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchBaits = axios.get(`${url}bait/auction/${id}/bait`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    Promise.all([fetchAuction, fetchBaits])
      .then((response) => {
        setAuction(response[0].data.auctionData);
        setBaits(response[1].data);
        setTotalPages(Math.ceil(response[1].data.total / itemsPerPage));

        console.log("Fetched auction:", auction);
        console.log(baits);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, userId, page, itemsPerPage]); // Update on changes to ID, user, page, or itemsPerPage

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Head>
        <title>Auction details</title>
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
                Error fetching auction: {error.message}
              </Typography>
            )}

            {auction && ( // Conditionally render auction details only if fetched
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  p: 2,
                }}
              >
                <Stack direction="row" alignItems="flex-start" spacing={4}>
                  <Grid xs={12} md={6} lg={6}>
                    <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Typography color="text.secondary" variant="body2">
                        Auction Name
                      </Typography>
                      <Typography variant="h6">{auction.campaignName}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        Description 
                      </Typography>
                      <Typography variant="h6">{auction.campaignDescription}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        Lifetime budget 
                      </Typography>
                      <Typography variant="h6">{auction.campaignBudget}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        Daily Budget
                      </Typography>
                      <Typography variant="h6">{auction.campaignDailyBudget}</Typography>
                      
                    </Stack>
                  </Grid>
                  {/* Add other auction details here (e.g., description, budget) */}
                </Stack>
              </Card>
            )}

            <Typography variant="h5">All Auction Bait Plants</Typography>
            {baits && (
            <Grid container spacing={3}>
              {baits.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product.id}>
                  
                  <BaitplantCard product={product} />
                </Grid>
              ))}
            </Grid>
            )}

            {/* Pagination (if totalPages is greater than 1) */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  size="small"
                />
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

