import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { Grid, TextField, Button, Stack, FormControlLabel, Checkbox, Box, Typography, Paper, FormLabel, FormControl, FormHelperText } from '@mui/material';


const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const targetInterests = [
  {
    value: 'Music',
    label: 'Music'
  },

  {
    value: 'Entertainment',
    label: 'Entertainment'
  },

  {
    value: 'Sports',
    label: 'Sports'
  },

  {
    value: 'Gaming',
    label: 'Gaming'
  },

  {
    value: 'Fashion & Beauty',
    label: 'Fashion & Beauty'
  },

  {
    value: 'Food & Drinks',
    label: 'Food & Drinks'
  },

  {
    value: 'Business & Finance',
    label: 'Business & Finance'
  },

  {
    value: 'Travel & Tourism',
    label: 'Travel & Tourism'
  },

  {
    value: 'Technology & Science',
    label: 'Technology & Science'
  },

  {
    value: 'Jewellery',
    label: 'Jewellery'
  },

  {
    value: 'Outdoors',
    label: 'Outdoors'
  },

  {
    value: 'Fitness',
    label: 'Fitness'
  },

  {
    value: 'Home Design',
    label: 'Home Design'
  }
]

const basicValues = [
  {
    value: 'Yes',
    label: 'Yes'
  },

  {
    value: 'No',
    label: 'No'
  }
]

const genders = [
  {
    value: 'All',
    label: 'All'
  },

  {
    value: 'Male',
    label: 'Male'
  },

  {
    value: 'Female',
    label: 'Female'
  },
]

const employmentLevel = [
  {
    value: 'All',
    label: 'All'
  },

  {
    value: 'Primary School',
    label: 'Primary Shcool'
  },

  {
    value: 'High School',
    label: 'High School'
  },

  {
    value: 'Tetiary Institution',
    label: 'Tetiary Institution'
  },

  {
    value: 'Currently Employed',
    label: 'Currently Employed'
  },

  {
    value: 'Unemployed',
    label: 'Unemployed'
  }
]

const targetLanguages = [
{
    value: 'English',
    label: 'English'
  },

  {
    value: 'IsiZulu',
    label: 'IsiZulu'
  },

  {
    value: 'IsiXhosa',
    label: 'IsiXhosa'
  },

  {
    value: 'sePedi',
    label: 'sePedi'
  },

  {
    value: 'seSotho',
    label: 'seSotho'
  },

  {
    value: 'IsiNdebele',
    label: 'IsiNdebele'
  },

  {
    value: 'Venda',
    label: 'Venda'
  },

  {
    value: 'Afrikaans',
    label: 'Afrikaans'
  },

  {
    value: 'Tsonga',
    label: 'Tsonga'
  },

  {
    value: 'Tswana',
    label: 'Tswana'
  },

  {
    value: 'Ndebele',
    label: 'Ndebele'
  },
  
  {
    value: 'Swati',
    label: 'Swati'
  }
]



/* const statuses = [
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

]; */

export const Auction = ({ _id }) => {
  const token = localStorage.getItem("myToken");
  const userId = localStorage.getItem("userId");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [auction, setAuction] = useState({
    campaignName: '',
    campaignDescription: '',
    campaignBudget: 0,
    acquisitionBid: 0,
    campaignStartDate: '',
    interests: [],
    gender: '',
    cities: [],
    employmentLevel: '',
    ageGroup: '',
    birthdays: '',
    status: 'Pending',

  });

  const [variantName, setVariantName] = React.useState([
   
  ]);

  const handleInterestsChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    const filterdValue = value.filter(
      (item) => variantName.findIndex((o) => o.value === item.value) >= 0
    );

    let duplicatesRemoved = value.filter((item, itemIndex) =>
      value.findIndex((o, oIndex) => o.value === item.value && oIndex !== itemIndex)
    );

    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.value === item.value) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.value === item.value);
      } else {
        duplicateRemoved.push(item);
      }
    });

    setVariantName(duplicateRemoved);
    let finalInterests = []
    duplicateRemoved.forEach((interest)=>{
      finalInterests.push(interest.value)
    })
    setAuction({ ...auction, interests: finalInterests.join(',') })
  };


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
                type='number'
                value={auction.campaignBudget}
                onChange={(event) => setAuction({ ...auction, campaignBudget: event.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="acquisitionBid"
                name="acquisitionBid"
                label="User Acquisition Bid"
                type='number'
                value={auction.acquisitionBid}
                onChange={(event) => setAuction({ ...auction, acquisitionBid: event.target.value })}
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

            <FormControl sx={{ m: 1, width: 210 }}>
        <InputLabel id="demo-multiple-checkbox-label">Target Interests</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={variantName}
          onChange={handleInterestsChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.map((x) => x.label).join(', ')}
          MenuProps={MenuProps}
        >
          {targetInterests.map((variant) => (
            <MenuItem key={variant.id} value={variant}>
              <Checkbox
                checked={
                  variantName.findIndex((item) => item.value === variant.value) >= 0
                }
              />
              <ListItemText primary={variant.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
              
             
            </Grid>


            <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Target Language
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  onChange={(event)=> {
                    setAuction({ ...auction, language: event.target.value })

                  }}
                  inputProps={{
                    name: "target-language",
                    id: "target-language",
                  }}
                >
                 {targetLanguages.map((name) => (
            <option key={name.value} value={name.value}>
              {name.label}
            </option>
          ))}
                </NativeSelect>
              </FormControl>
                          
            </Grid>

            <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Target Birthdays
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  onChange={(event)=> {
                    setAuction({ ...auction, birthdays: event.target.value })

                  }}
                  inputProps={{
                    name: "target-birthdays",
                    id: "target-birthdays",
                  }}
                >
                 {basicValues.map((name) => (
            <option key={name.value} value={name.value}>
              {name.label}
            </option>
          ))}
                </NativeSelect>
              </FormControl>
                          
            </Grid>

            <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Target Age Group
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  onChange={(event)=> {
                    setAuction({ ...auction, targetAgeGroup: event.target.value })

                  }}
                  inputProps={{
                    name: "multiple-age-group",
                    id: "multiple-age-group",
                  }}
                >
                  <option value={'< 13'}>Under 13</option>
                  <option value={'13 - 18'}>Between 13 and 18</option>
                  <option value={'18 - 25'}>Between 18 and 25</option>
                  <option value={'25 >'}>25 and above</option>
                </NativeSelect>
              </FormControl>
                          
            </Grid>

            <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Target Gender
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  onChange={(event)=> {
                    setAuction({ ...auction, targetGender: event.target.value })

                  }}
                  inputProps={{
                    name: "multiple-gender",
                    id: "multiple-gender",
                  }}
                >
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                  <option value={'other'}>Other</option>
                </NativeSelect>
              </FormControl>
                          
            </Grid>

            <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Target Employment
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  onChange={(event)=> {
                    setAuction({ ...auction, emplopyment: event.target.value })

                  }}
                  inputProps={{
                    name: "multiple-employment",
                    id: "multiple-employment",
                  }}
                >
                 {employmentLevel.map((name) => (
            <option key={name.value} value={name.value}>
              {name.label}
            </option>
          ))}
                </NativeSelect>
              </FormControl>
                          
            </Grid>


            <Grid item xs={12} sm={6} style={{ display: 'none' }}>
              <TextField
                required
                id="status"
                name="status"
                label="Status"
                value={auction.status}
                
                fullWidth
              />
            </Grid>

            {/* <Grid
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
                SelectProps={{ native: true }}
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
            </Grid> */}


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