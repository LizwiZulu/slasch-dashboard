import { useState, useEffect } from 'react';
import { Card, CardContent, Box, Avatar, Typography, Button, Divider, CardActions } from '@mui/material';
import axios from 'axios';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business/owner';

export const AccountProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
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
        console.log(response.data.businessOwner);
      })
      .catch(error => {
        console.error(error);
      });
    }
    
  }, []);

  return (
     <Card>
        <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.profilePicture}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.firstname} {user.surname}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.locationOrAddress} 
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.phoneNumber}
          </Typography>
        </Box>
      </CardContent>  
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card> 
  );
};

