import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography, Grid, Card, Button, Modal, TextField, InputLabel,} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { app, auth, storage } from 'src/firebase/config';

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
  const auctionId = new URLSearchParams(window.location.search).get('auctionId');

  const [bait, setBait] = useState({
    baitPlantName: '',
    baitPlantDescription: '',
    checkInStoreAvailability: 'Instock',
    percentageDiscount: '',
    price: '',
    color: '',
    size: '',
    status: 'Pending',
    photos: [],
  });

  const [photoInputs, setPhotoInputs] = useState([{
    value: null,
  }]);

  const [photosUploaded, setPhotosUploaded] = useState(false);

  const [progress, setProgress] = useState(0);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const uploadPhotos = async () => {
      setUploading(true);
      const promises = photoInputs.map((input) => handleUploadPhoto(input.value));
      await Promise.all(promises);
      setPhotosUploaded(true);
      setUploading(false);
    };
    uploadPhotos();
  }, [photoInputs]);

  const handleUploadPhoto = (file) => {
    if (!file) {
      console.error('No file provided');
      return;
    }
    const storageRef = storage.ref(`baitPhotos/${file.name}`);
    const uploadTask = storageRef.put(file);
    return uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newPhotos = [...bait.photos];
          newPhotos.push(downloadURL);
          setBait((prevBait) => ({ ...prevBait, photos: newPhotos }));
        });
      }
    );
  };

  const handleUpdatePhotos = () => {
    const newPhotos = photoInputs.map((input) => input.value);
    setBait((prevBait) => ({ ...prevBait, photos: newPhotos }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdatePhotos();
    axios.post(`${url}/${auctionId}/bait/create`, bait, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Bait created successfully!');
        router.push(`/auction/${auctionId}`);
      })
      .catch((error) => {
        console.error('Error creating business:', error);
      });
  };

  const handleAddPhotoInput = () => {
    setPhotoInputs((prevInputs) => [...prevInputs, { value: null }]);
  };

  const handleRemovePhotoInput = (index) => {
    setPhotoInputs((prevInputs) => prevInputs.filter((input, i) => i !== index));
  };

  const handlePhotoInputChange = (index, event) => {
    const file = event.target.files[0];
    setPhotoInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index].value = file;
      return newInputs;
    });
  };
  

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
                      <InputLabel>Photo {index + 1}</InputLabel>
                      <input
                        type="file"
                        id={`photo-${index}`}
                        name={`photo-${index}`}
                        onChange={(event) => handlePhotoInputChange(index, event)}
                        required
                      />
                      <Button onClick={() => handleRemovePhotoInput(index)}>Remove</Button>
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6}>
                    <Button onClick={handleAddPhotoInput}>Add Photo</Button>
                  </Grid>

                  {uploading && (
                    <Grid item xs={12}>
                      <LinearProgress />
                    </Grid>
                  )}

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