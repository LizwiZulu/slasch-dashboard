import React from 'react';
import Head from 'next/head';
import {
  Box, Container, Stack, Typography, Grid, CircularProgress, Avatar, Card, Table,
  TableBody, TextField,
  TableCell, SvgIcon,
  TableContainer, TableHead,
  TableRow, Button, Modal
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/';

const Availability = [
  {
    value: 'Instock',
    label: 'Instock'
  },
  {
    value: 'Not instock',
    label: 'Not instock'
  },

];

const Page = () => {
  const router = useRouter();
  const token = localStorage.getItem("myToken");
  //const auctionId = router.query.id;
  const auctionId = new URLSearchParams(window.location.search).get('_id');
  const busId = new URLSearchParams(window.location.search).get('businessId');

  const [auction, setAuction] = useState({
    campaignName: '',
    campaignDescription: '',
    campaignBudget: '',
    campaignDailyBudget: '',
    campaignStartDate: '',
    interests: '',
    status: 'Pending',

  });

  console.log("Business Id:", busId);
  console.log("Auction Id:", auctionId);
  
   useEffect(() => {
     
    const fetchAuction = async () => {
      const response = await axios.get(`${url}business/${busId}/auction/${auctionId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setAuction(response.data.auctionData);///
      console.log("Fetched auction :", response.data.auctionData);
    };
    fetchAuction();
  }, [auctionId]);


  const handleSubmit = (event) => {
    event.preventDefault();
   
    axios.patch(`${url}business/${busId}/auction/update/${auctionId}`, auction, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Auction updated successfully!');

        router.push(`/auction/${auctionId}`);
      })
      .catch((error) => {
        console.error('Error updating auction:', error);
      });

    router.push(`/auction/${auctionId}`);
  };

  

  return (
    <>
      <Head>
        <title>Edit auction</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>

            <Typography variant="h5">Edit auction</Typography>

            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                p: 2,
              }}
            >

              <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campaignName"
                name="CampaignName"
                label="Auction Name"
                value={auction.campaignName}
                onChange={(event) => setAuction({ ...auction, campaignName: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campaignDescription"
                name="campaignDescription"
                label="Auction Description"
                value={auction.campaignDescription}
                onChange={(event) => setAuction({ ...auction, campaignDescription: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campaignBudget"
                name="campaignBudget"
                label="Auction Budget"
                value={auction.campaignBudget}
                onChange={(event) => setAuction({ ...auction, campaignBudget: event.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campaignDailyBudget"
                name="campaignDailyBudget"
                label="Auction Daily Budget"
                value={auction.campaignDailyBudget}
                onChange={(event) => setAuction({ ...auction, campaignDailyBudget: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campaignStartDate"
                name="campaignStartDate"
                label="Auction Start Date"
                value={auction.campaignStartDate}
                onChange={(event) => setAuction({ ...auction, campaignStartDate: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="interests"
                name="interests"
                label="Interests"
                value={auction.interests}
                onChange={(event) => setAuction({ ...auction, interests: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: 'none' }}>
              <TextField
                required
                id="status"
                name="status"
                label="Status"
                value={auction.status}
                
                fullWidth
              />
            </Grid>

            {/* <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="Select Status"
                name="status"
                onChange={(event) => setAuction({ ...auction, status: event.target.value })}
                required
                select
                SelectProps={{ native: true }}
                value={auction.status}
              >
                {statuses.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}


            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>

            </Card>

          </Stack>
        </Container>
      </Box>

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;