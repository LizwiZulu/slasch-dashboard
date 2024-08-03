import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import CreditCardIcon from '@heroicons/react/24/solid/CreditCardIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, Button } from '@mui/material';

// Import the Business component
import { Auction } from './auction';

export const AuctionCard = ({
  campaignName,
  campaignDescription,
  campaignBudget,
  campaignDailyBudget,
  _id,
  businessId

}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleEditButtonClicked = () => {

    router.push({
      pathname: `/auction/edit-auction`,
      query: { _id, businessId },
    });
  };

  const handleViewButtonClicked = () => {

    router.push({
      pathname: `/auction/${_id}`,
      query: { businessId },
    });
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
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {campaignName}
          </Typography>
          {/*  <Avatar
            src={BusinessHours}
            variant="square"
          /> */}
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          {campaignDescription}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          Auction lifetime budget: {campaignBudget}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          
          
        </Stack>

        {localStorage.getItem('role') == 'user' && (

<Stack
alignItems="center"
direction="row"
spacing={1}
>

<Button variant="contained" startIcon={<SvgIcon fontSize="small"><PencilIcon /></SvgIcon>} onClick={handleEditButtonClicked} >
  Edit
</Button>  

<Button variant="contained" startIcon={<SvgIcon fontSize="small"><EyeIcon /></SvgIcon>} onClick={handleViewButtonClicked}>
  View
</Button>

</Stack>
        )}


      </Stack>
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContent>
            <Auction _id={_id} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

AuctionCard.propTypes = {
  campaignName: PropTypes.string.isRequired,
  campaignDescription: PropTypes.string.isRequired,
  campaignBudget: PropTypes.string.isRequired,
  campaignDailyBudget: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  businessId: PropTypes.string.isRequired
};