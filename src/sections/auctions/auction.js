import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Grid, TextField, Button, FormControlLabel, Checkbox, Box, Typography, Paper, FormLabel, FormControl, FormHelperText } from '@mui/material';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

export const Auction = ({ _id }) => {
  const token = localStorage.getItem("myToken");
  const userId = localStorage.getItem("userId");
  const router = useRouter();
  const [auction, setAuction] = useState({
    campaignName: '',
    campaignDescription: '',
    campaignBudget: '',
    campaignDailyBudget: '',
    campaignStartDate: '',
    interests: '',
     
  });

  useEffect(() => {
    if (!_id) return;

    const fetchAuction = async () => {
      const response = await axios.get(`${url}/${userId}/auction/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setAuction(response.data.business);///
    };
    fetchAuction();
  }, [_id]);

  /* useEffect (() => {
    if (!business._id ) return;

    const fetchBusiness = async () => {
      const resposnse = await axios.get(`${url}/${business._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched business:", response.data.business);
        setBusiness(response.data.business);
        
      })
      .catch((error) => {
        setError(error);
      })
    };
    fetchBusiness();
  }, []); */

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!_id) {
      axios.post(`${url}/${userId}/auction`, auction, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Auction created successfully!');
        //New code starts here
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error creating business:', error);
      });
      router.push('/auctions')

    } else {
      axios.patch(`${url}/${userId}/auction/${_id}`, auction, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Auction updated successfully!');
        //New code starts here
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error updating business:', error);
      });
      router.push('/auctions')
    }

    
  };

  console.log(auction);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
        {..._id ? "Update Auction" : "Add New Auction"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campaignName"
                name="CampaignName"
                label="Campain Name"
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
                label="Campaign Description"
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
                label="campaignBudget"
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
                label="campaignDailyBudget"
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
                label="campaignStartDate"
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
       
            
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary"  fullWidth>
              {..._id ? "Update Auction" : "Add Auction"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
  
Auction.propTypes = {
    campaignName: PropTypes.string,
    campaignDescription: PropTypes.string,
    campaignBudget: PropTypes.string,
    campaignDailyBudget: PropTypes.string,
    campaignStartDate: PropTypes.string,
    interests: PropTypes.string,
    
  };