import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business/owner';


const states = [
  {
    value: 'kwazulu-natal',
    label: 'KwaZulu Natal'
  },
  {
    value: 'gauteng',
    label: 'Gauteng'
  },
  {
    value: 'mpumalanga',
    label: 'Mpumalanga'
  },
  {
    value: 'eastern-cape',
    label: 'Eastern Cape'
  }
];

export const AccountProfileDetails = () => {
  const [user, setUser] = useState({
    firstname: '',
    surname: '',
    email: '',
    phoneNumber: '',
    state: '',
    locationOrAddress: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userEmail = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");

    axios.get(`${url}/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    })
      .then(response => {
        setUser(response.data.businessOwner);
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleChange = useCallback(
    (event) => {
      setUser((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

   const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      axios.put(`${url}/${userId}`, user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    [user]
  ); 

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstname"
                  onChange={handleChange}
                  required
                  value={user.firstname}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="surname"
                  onChange={handleChange}
                  required
                  value={user.surname}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={user.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  type="number"
                  value={user.phoneNumber}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Location"
                  name="locationOrAddress"
                  onChange={handleChange}
                  required
                  value={user.locationOrAddress}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={user.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
