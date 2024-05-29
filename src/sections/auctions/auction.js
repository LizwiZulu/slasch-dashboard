import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Grid, TextField, Button, Stack, FormControlLabel, Checkbox, Box, Typography, Paper, FormLabel, FormControl, FormHelperText } from '@mui/material';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

const statuses = [
  {
    value: 'Active',
    label: 'Active'
  },
  {
    value: 'Expired',
    label: 'Expired'
  },
  {
    value: 'Cancelled',
    label: 'Cancelled'
  },

];

export const Auction = ({ _id }) => {
  const token = localStorage.getItem("myToken");
  const userId = localStorage.getItem("userId");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [auction, setAuction] = useState({
    campaignName: '',
    campaignDescription: '',
    campaignBudget: '',
    campaignDailyBudget: '',
    campaignStartDate: '',
    interests: '',
    status: '',

  });

  /* useEffect(() => {
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
  }, [_id]); */



  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${url}/${_id}/auction`, auction, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Auction created successfully!');
        //New code starts here
        handleModalClose();
        router.push(`/businessdetails/${_id}`);
      })
      .catch((error) => {
        console.error('Error creating business:', error);
      });
    /* router.push('/auctions'); */
    handleModalClose();
    router.push(`/businessdetails/${_id}`);
  };

  console.log(auction);

  const handleModalClose = () => {
    setShowModal(false);
  };
  /* const handleModalClose = () => {
    setModalOpen(false);
  }; */

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack sx={{ pb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Auction
        </Typography>
        </Stack>
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

            <Grid
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
                SelectProps={{ native: false }}
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
            </Grid>


            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Auction
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