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

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business/auction';
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
  const baitId = new URLSearchParams(window.location.search).get('baitId');

  const [bait, setBait] = useState({
    baitPlantName: '',
    baitPlantDescription: '',
    checkInStoreAvailability: 'Instock',
    percentageDiscount: '',
    price: '',
    color: '',
    size: '',
    status: 'Pending',
    photos: [''],
  });

  console.log("Bait Id is:". baitId);
  
  /* useEffect(() => {
    
    const fetchBait = async () => {
      const response = await axios.get(`${url}/${baitId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setBait(response.data.business);
    };
    fetchBait();
  }, [baitId]); */

  const [photoInputs, setPhotoInputs] = useState([{
    value: '',
  }]);



  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdatePhotos();
    console.log('Submitting bait:', bait);
    axios.post(`${url}/${auctionId}/bait/create`, bait, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Bait created successfully!');

        router.push(`/auctiondetails/${auctionId}`);
      })
      .catch((error) => {
        console.error('Error creating business:', error);
      });

    router.push(`/auctiondetails/${auctionId}`);
  };

  const handleAddPhotoInput = () => {
    setPhotoInputs([...photoInputs, { value: '' }]);
  };

  const handleRemovePhotoInput = (index) => {
    setPhotoInputs(photoInputs.filter((input, i) => i !== index));
  };

  const handlePhotoInputChange = (index, value) => {
    const newPhotoInputs = [...photoInputs];
    newPhotoInputs[index].value = value;
    setPhotoInputs(newPhotoInputs);
  };

  const handleUpdatePhotos = () => {
    const newPhotos = photoInputs.map((input) => input.value);
    console.log('Updating photos:', newPhotos);
    setBait((prevBait) => ({ ...prevBait, photos: newPhotos }));
  };

  useEffect(() => {
    const newPhotos = photoInputs.map((input) => input.value);
    setBait((prevBait) => ({ ...prevBait, photos: newPhotos }));
  }, [photoInputs]);

  ///console.log("Received auction Id", auctionId);
  ///console.log(bait);

  return (
    <>
      <Head>
        <title>Add new bait</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>

            <Typography variant="h5">Create new bait</Typography>

            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                p: 2,
              }}
            >

              <form onSubmit={handleSubmit} >
                <Grid container spacing={2}>


                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="baitPlantName"
                      name="baitPlantName"
                      label="Bait Plant Name"
                      value={bait.baitPlantName}
                      onChange={(event) => setBait({ ...bait, baitPlantName: event.target.value })}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="baitPlantDescription"
                      name="baitPlantDescription"
                      label="Bait Plant Description"
                      value={bait.baitPlantDescription}
                      onChange={(event) => setBait({ ...bait, baitPlantDescription: event.target.value })}
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
                      id="checkInStoreAvailability"
                      label="Check In Store Availability"
                      name="checkInStoreAvailability"
                      onChange={(event) => setBait({ ...bait, checkInStoreAvailability: event.target.value })}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={bait.checkInStoreAvailability}
                    >
                      {Availability.map((option) => (
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
                      id="percentageDiscount"
                      name="percentageDiscount"
                      label="Percentage Discount"
                      value={bait.percentageDiscount}
                      onChange={(event) => setBait({ ...bait, percentageDiscount: event.target.value })}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="price"
                      name="price"
                      label="Price"
                      value={bait.price}
                      onChange={(event) => setBait({ ...bait, price: event.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ display: 'none' }}>
                    <TextField
                      required
                      id="status"
                      name="status"
                      label="Status"
                      value={bait.status}

                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="color"
                      name="color"
                      label="Color"
                      value={bait.color}
                      onChange={(event) => setBait({ ...bait, color: event.target.value })}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="size"
                      name="size"
                      label="Size"
                      value={bait.size}
                      onChange={(event) => setBait({ ...bait, size: event.target.value })}
                      fullWidth
                    />
                  </Grid>

                  {photoInputs.map((input, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <TextField
                        required
                        id={`photo-${index}`}
                        name={`photo-${index}`}
                        label="Photo"
                        value={input.value}
                        onChange={(event) => handlePhotoInputChange(index, event.target.value)}
                        fullWidth
                      />
                      <Button onClick={() => handleRemovePhotoInput(index)}>Remove</Button>
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6}>
                    <Button onClick={handleAddPhotoInput}>Add Photo</Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Create bait
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