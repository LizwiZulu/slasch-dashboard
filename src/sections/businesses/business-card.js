import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, Button } from '@mui/material';

import { Business } from './business'; // Import the Business component

export const BusinessCard = ({
  BusinessName,
  BusinessCategory,
  BusinessLocation,
  _id,
  BusinessHours
}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleEditButtonClicked = () => {
    setShowModal(true);
  };

  const handleViewButtonClicked = () => {
    router.push(`/businessdetails/${_id}`);
  };
  const handleOrdersButtonClicked = () => {
    router.push(`/orders`);
  };
  /* const handleViewButtonClicked = () => {
    //navigate to a new page with the business information and list all auctions under tha business. Create a new page called businessDeatils. 
  }; */

  return (
    <Card

      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '95%',
        width: '95%',
        pb: 2
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={BusinessHours}
            variant="square"
            sx={{ width: 75, height: 75 }}
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {BusinessName}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {BusinessCategory}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-around"
        spacing={2}
        sx={{ p: 1 }}

      >

        {localStorage.getItem("userEmail") != "admin@adlinc.com" && (

          <Stack

          >
            <Button variant="contained" startIcon={<SvgIcon fontSize="small"><PencilIcon /></SvgIcon>} onClick={handleEditButtonClicked}>
              Edit Business
            </Button>


          </Stack>
        )}

        <Button variant="contained" startIcon={<SvgIcon fontSize="small"><EyeIcon /></SvgIcon>} onClick={handleViewButtonClicked}>
          View Business
        </Button>

        {/* <Button variant="contained" startIcon={<SvgIcon fontSize="small"><EyeIcon /></SvgIcon>} onClick={handleOrdersButtonClicked}>
          Orders
        </Button> */}
        
      </Stack>
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContent>
            <Business _id={_id} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

BusinessCard.propTypes = {
  BusinessName: PropTypes.string.isRequired,
  BusinessCategory: PropTypes.string.isRequired,
  BusinessLocation: PropTypes.string.isRequired,
  BusinessHours: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};