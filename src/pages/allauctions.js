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
  Modal
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Auction } from 'src/sections/auctions/auction';
import { AuctionCard } from 'src/sections/auctions/auction-card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business/';
const aurl = 'https://adlinc-api.onrender.com/api/slaschapp/admin/auctions';

const Page = () => {
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("role");
    if (userEmail === "admin") {
      setIsLoading(true);
      setError(null);
      axios.get(aurl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Fetched auctions:", response.data.auctionData);
          setAuctions(response.data.auctionData);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      setError(null);
      axios.get(`${url}${userId}/auction`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
        console.log("Fetched auctions:", response);
          setAuctions(response.data.auctionData);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
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

  const handleAddButtonClicked = () => {
    setShowModal(true);
  };

  return (
    <>
      <Head>
        <title>Aunctions</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3}}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              
            </Stack>
            {/* <BusinessesSearch /> */}
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
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContent>
            <Auction />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
