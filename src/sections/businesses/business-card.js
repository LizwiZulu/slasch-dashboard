import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
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
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >


          {localStorage.getItem("userEmail") != "admin@adlinc.com" && (

            <div>
              <Button variant="contained" startIcon={<SvgIcon fontSize="small"><PencilIcon /></SvgIcon>} onClick={handleEditButtonClicked} >
                Edit business
              </Button>
            </div>)}
            
        </Stack>
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