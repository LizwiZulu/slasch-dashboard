import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Grid, TextField, Button, FormControlLabel, Checkbox, Box, Typography, Paper, FormLabel, FormControl, FormHelperText } from '@mui/material';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

export const Business = ({ _id }) => {
  const token = localStorage.getItem("myToken");
  const router = useRouter();
  const [business, setBusiness] = useState({
    BusinessName: '',
    PhoneNumber: '',
    BusinessEmail: '',
    AcceptTermsAndConditions: '',
    BusinessCategory: '',
    BusinessLocation: '',
    BusinessHours: '',
    verificationDoc: '',
    status: '',
    socials: '',
     
  });

  useEffect(() => {
    if (!_id) return;

    const fetchBusiness = async () => {
      const response = await axios.get(`${url}/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setBusiness(response.data.business);
    };
    fetchBusiness();
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
      axios.post('https://adlinc-api.onrender.com/api/slaschapp/business', business, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Business created successfully!');
        //New code starts here
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error creating business:', error);
      });
      router.push('/businesses')

    } else {
      axios.patch(`${url}/${_id}`, business, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Business updates successfully!');
        //New code starts here
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error updating business:', error);
      });
      router.push('/businesses')
    }

    
  };

  console.log(business);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
        {..._id ? "Update Business" : "Add new Business"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="BusinessName"
                name="BusinessName"
                label="Business Name"
                value={business.BusinessName}
                onChange={(event) => setBusiness({ ...business, BusinessName: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="PhoneNumber"
                name="PhoneNumber"
                label="Phone Number"
                value={business.PhoneNumber}
                onChange={(event) => setBusiness({ ...business, PhoneNumber: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="BusinessEmail"
                name="BusinessEmail"
                label="Business Email"
                value={business.BusinessEmail}
                onChange={(event) => setBusiness({ ...business, BusinessEmail: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControlLabel
    control={
      <Checkbox
        id="AcceptTermsAndConditions"
        name="AcceptTermsAndConditions"
        value="yes"
        onChange={(event) => setBusiness({ ...business, AcceptTermsAndConditions: event.target.checked ? "yes" : "No" })}
      />
    }
    label="Accept Terms and Conditions"
  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="BusinessCategory"
                name="BusinessCategory"
                label="Business Category"
                value={business.BusinessCategory}
                onChange={(event) => setBusiness({ ...business, BusinessCategory: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="BusinessLocation"
                name="BusinessLocation"
                label="Business Location"
                value={business.BusinessLocation}
                onChange={(event) => setBusiness({ ...business, BusinessLocation: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="BusinessHours"
                name="BusinessHours"
                label="Business Hours"
                value={business.BusinessHours}
                onChange={(event) => setBusiness({ ...business, BusinessHours: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="verificationDoc"
                name="verificationDoc"
                label="Verification Doc"
                value={business.verificationDoc}
                onChange={(event) => setBusiness({ ...business, verificationDoc: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="status"
                name="status"
                label="Status"
                value={business.status}
                onChange={(event) => setBusiness({ ...business, status: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="socials"
                name="socials"
                label="Socials"
                value={business.socials}
                onChange={(event) => setBusiness({ ...business, socials: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary"  fullWidth>
              {..._id ? "Update Business" : "Add Business"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
  
  Business.propTypes = {
    BusinessName: PropTypes.string,
    PhoneNumber: PropTypes.string,
    BusinessEmail: PropTypes.string,
    AcceptTermsAndConditions: PropTypes.string,
    BusinessCategory: PropTypes.string,
    BusinessLocation: PropTypes.string,
    BusinessHours: PropTypes.string,
    verificationDoc: PropTypes.string,
    status: PropTypes.string,
    socials: PropTypes.string,
    _id: PropTypes.string,
    
  };