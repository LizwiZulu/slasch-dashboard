import Head from 'next/head';
import PropTypes from 'prop-types';
import {
  Box, Container, Stack, Typography, Grid, CircularProgress, Avatar, Card, Table,
  TableBody,
  TableCell,SvgIcon,
  TableContainer, TableHead,
  TableRow, Button, Modal,
  Alert
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuctionCard } from 'src/sections/auctions/auction-card';
import Pagination from '@mui/material/Pagination';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Auction } from 'src/sections/auctions/auction';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ClearIcon } from '@mui/x-date-pickers';

const updateURL = 'https://adlinc-api.onrender.com/api/slaschapp/admin/validate/owner';
const updateURLUser = 'https://adlinc-api.onrender.com/api/slaschapp/admin/activate/user';


export const BusinessDetailsAdmin = (props) => {
let {
business: {}
} = props;

async function updateBusinessStatus(e, newValue) {
    const token = localStorage.getItem("myToken");
    console.log("Where I send...........",updateURL, props.business._id, newValue);
   await axios.patch(`${updateURL}/${props.business._id}`, {
    newStatus: newValue
  },
  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
    },
     ).then((response) => {
        console.log('My response .... ', response)
        if(response.status == 200){
            window.location.reload()
        } else {
            Alert('There was an error updating business status. Please try again.')
        }
    })
  }

  async function updateBusinessStatusUser(e, newValue) {
    const token = localStorage.getItem("myToken");
    //console.log("Where I send...........",updateURL, props.business._id, newValue);
   await axios.patch(`${updateURLUser}/${props.business._id}`, {
    newStatus: newValue
  },
  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
    },
     ).then((response) => {
        console.log('My response .... ', response)
        if(response.status == 200){
            window.location.reload()
        } else {
            Alert('There was an error updating business status. Please try again.')
        }
    })
  }

return (
    <>
      <Head>
        <title>User Details</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>

            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                p: 2,
              }}
            >
              <Grid container alignItems="center">
                

                <Grid xs={12} md={6} lg={4}>
                  <Avatar
                    src={props.business?.profilePicture}
                    variant="rounded"
                    sx={{ width: 275, height: 275 }}
                  />
                </Grid>
                <Grid>
                    <Stack direction="row" justifyContent="space-between" spacing={4} my={3}>
                        {props.business?.status == 'Active' && (
                            <Button color='error' variant="contained" startIcon={<SvgIcon fontSize="small"><ClearIcon /></SvgIcon>} onClick={(e)=>{
                              if(localStorage.getItem('userRole') == 'users'){
                                updateBusinessStatusUser(e, 'Revoked')
                              } else {
                                updateBusinessStatus(e, 'Revoked')
                              }
                              }}>
                            Revoke Account
                          </Button>
                        )}

                        {props.business?.status == 'Pending' && (
                            <>
                            <div>
                <Button color='success' variant="contained" startIcon={<SvgIcon fontSize="small"><CheckIcon /></SvgIcon>} onClick={(e)=>{
                   if(localStorage.getItem('userRole') == 'users'){
                    updateBusinessStatusUser(e, 'Revoked')
                  } else{
                  updateBusinessStatus(e, 'Active')
                }}}>
                  Approve Account
                </Button>
              </div> 
               <div>
                <Button color='error' variant="contained" startIcon={<SvgIcon fontSize="small"><ClearIcon /></SvgIcon>} onClick={(e)=>{
                   if(localStorage.getItem('userRole') == 'users'){
                    updateBusinessStatusUser(e, 'Revoked')
                  } else {
                  updateBusinessStatus(e, 'Revoked')}
                  }}>
                  Reject Account
                </Button>
              </div> 
                            </>
                        )}

                        {props.business?.status == 'Revoked' && (
                            <Button color='success' variant="contained" startIcon={<SvgIcon fontSize="small"><CheckIcon /></SvgIcon>} onClick={(e)=>{
                              if(localStorage.getItem('userRole') == 'users'){
                                updateBusinessStatusUser(e, 'Revoked')
                              } else{
                              updateBusinessStatus(e, 'Active')}
                              }}>
                            Re-activate Account
                          </Button>
                        )}
            
            </Stack> 
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                  <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>  <Typography color="text.secondary" variant="body2">
                              User Name
                            </Typography></TableCell>
                            <TableCell>{props.business?.firstname} {props.business?.surname}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell> <Typography color="text.secondary" variant="body2">
                              User Email
                            </Typography></TableCell>
                            <TableCell>{props.business?.email}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><Typography color="text.secondary" variant="body2">
                              User Address
                            </Typography></TableCell>
                            <TableCell>{props.business?.locationOrAddress}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><Typography color="text.secondary" variant="body2">
                              Phone Number
                            </Typography></TableCell>
                            <TableCell>{props.business?.phoneNumber}</TableCell>
                          </TableRow>
                          {/* <TableRow>
                            <TableCell><Typography color="text.secondary" variant="body2">
                              User Employment Level
                            </Typography></TableCell>
                            <TableCell>{props.business?.educationStatus}</TableCell>
                          </TableRow> */}
                          <TableRow>
                            <TableCell><Typography color="text.secondary" variant="body2">
                              User Address
                            </Typography></TableCell>
                            <TableCell>{props.business?.locationOrAddress}</TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Stack>
                </Grid>

              </Grid>

             {
              localStorage.getItem('userRole') =='users'
              ?<>
              <Container></Container>
              </>
              : <>
              <h3>User Verification Document</h3>
              <iframe src={props.business?.IdDocumentLink} height="500" title='Verification Document'></iframe>
              </>
              
              }

            
            </Card>

          </Stack>
        </Container>
      </Box>
      
    </>
)

};

BusinessDetailsAdmin.propTypes ={
    business: PropTypes.object
};
export default BusinessDetailsAdmin;