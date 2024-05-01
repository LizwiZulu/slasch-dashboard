import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { AuctionCard } from 'src/sections/auctions/auction-card';

import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business/'; //Change this endpoint to auctions

const Page = () => {
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userId = localStorage.getItem("userId");
    if (token) {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      axios.get(`${url}${userId}/auction`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Fetched auctions:", response.data.auctionData); // replaces businesses with auctions
          setAuctions(response.data.auctionData);
          setTotalPages(Math.ceil(response.data.length / 10));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Head>
        <title>Auctions</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">All Auctions</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowUpOnSquareIcon /></SvgIcon>}>
                    Import
                  </Button>
                  <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon>}>
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button variant="contained" startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>}>
                  Add
                </Button>
              </div>
            </Stack>
           {/*  <CompaniesSearch /> */}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography variant="body2" color="error">
                Error fetching auctions: {error.message}
              </Typography>
            )}
            {auctions.length > 0 && ( // replaced companies with auctions
              <>
                <Grid container spacing={3}>
                  {auctions.map((auction, index) => ( // replaces business with auction
                    <Grid xs={12} md={6} lg={4} key={auction._id}>
                      <AuctionCard
                        AuctionName={auction.AuctionName}
                        AuctionCategory={auction.AuctionCategory}
                        AuctionLocation={auction.AuctionLocation}
                        AuctionHours={auction.AuctionHours}
                      />
                    </Grid>
                  ))}
                  {/* {companies.slice((page - 1) * 10, page * 10).map((company) => (
                    <Grid xs={12} md={6} lg={4} key={company.id}>
                      <CompanyCard 
                      company={company} />
                      
                    </Grid>
                  ))} */}
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