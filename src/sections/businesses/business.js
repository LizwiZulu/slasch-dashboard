import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Grid, TextField, Button, FormControlLabel, Checkbox, Box, Typography, Paper, FormLabel, FormControl, FormHelperText } from '@mui/material';
import { app, auth, storage } from 'src/firebase/config';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

const categories = [
  {
    value: 'Fashion And Apparel',
    label: 'Fashion & Apparel'
  },
  {
    value: 'Food And Drinks',
    label: 'Food & Drinks'
  },
  {
    value: 'Beauty And Cosmetics',
    label: 'Beauty & Cosmetics'
  },
  {
    value: 'Tech And Electronics',
    label: 'Tech & Electronics'
  },
  {
    value: 'Sneakers',
    label: 'Sneakers'
  },
  {
    value: 'Home',
    label: 'Home'
  },
  {
    value: 'Jewellery',
    label: 'Jewellery'
  },
];

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
    BusinessLogo: '',
    verificationDoc: '',
    socials: '',
    status: 'Pending',
    BusinessBio: '',
    BusinessType: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const BusinessLogo = event.target.BusinessLogo.files[0];
    const verificationDoc = event.target.verificationDoc.files[0];
    const storageRef = storage.ref(`BusinessLogos/${BusinessLogo.name}`);
    const uploadTask = storageRef.put(BusinessLogo);
    const storageRef2 = storage.ref(`VerificationDocs/${verificationDoc.name}`);
    const uploadTask2 = storageRef2.put(verificationDoc);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          business.BusinessLogo = downloadURL;
          uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL) => {
            business.verificationDoc = downloadURL;
            if (!_id) {
              axios.post(url, business, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              })
                .then((response) => {
                  console.log('Business created successfully!');
                  console.log(response);
                  //New code starts here
                  //handleModalClose();
                })
                .catch((error) => {
                  console.error('Error creating business:', error);
                });
              router.push('/business')
            } else {
              axios.patch(`${url}/update/${_id}`, business, {
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
              router.push('/business')
            }
          });
        });
      }
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
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
                id="BusinessBio"
                name="BusinessBio"
                label="Business Bio"
                value={business.BusinessBio}
                onChange={(event) => setBusiness({ ...business, BusinessBio: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="BusinessType"
                name="BusinessType"
                label="Business Type"
                value={business.BusinessType}
                onChange={(event) => setBusiness({ ...business, BusinessType: event.target.value })}
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

            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="Business Category"
                name="BusinessCategory"
                onChange={(event) => setBusiness({ ...business, BusinessCategory: event.target.value })}
                required
                select
                SelectProps={{ native: true }}
                value={business.BusinessCategory}
              >
                {categories.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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
                id="socials"
                name="socials"
                label="Socials"
                value={business.socials}
                onChange={(event) => setBusiness({ ...business, socials: event.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required>
                <FormLabel>Business Logo</FormLabel>
                <input type="file" id="BusinessLogo" name="BusinessLogo" />
                <FormHelperText>Upload Business Logo</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl required>
                <FormLabel>Verification Doc</FormLabel>
                <input type="file" id="verificationDoc" name="verificationDoc" />
                <FormHelperText>Upload Verification Doc</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
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
  BusinessBio: PropTypes.string,
  BusinessType: PropTypes.string,
  _id: PropTypes.string,
};

export default Business;