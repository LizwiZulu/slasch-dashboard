import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Grid,
  CircularProgress,
  Modal
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BusinessCard } from 'src/sections/businesses/business-card';
import { Business } from 'src/sections/businesses/business';
import { BusinessesSearch } from 'src/sections/businesses/businesses-search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';
const aurl = 'https://adlinc-api.onrender.com/api/slaschapp/admin/businesses';


const Page = () => {
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail === "admin@adlinc.com") {
      setIsLoading(true);
      setError(null);
      /* axios.get(`${url}/admin/businesses?page=${page}&itemsPerPage=${itemsPerPage}`, { */
      axios.get(`${aurl}?page=${page}&itemsPerPage=${itemsPerPage}`, {
        headers: {
          'Content-Type': 'application/json',
          /* 'Authorization': `Bearer ${token}`, */
        },
      })
        .then((response) => {
          console.log("Fetched companies:", response.data.businesses);
          setBusinesses(response.data.businesses);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {

      setIsLoading(true);
      setError(null);
      axios.get(`${url}?page=${page}&itemsPerPage=${itemsPerPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Fetched companies:", response.data.businesses); //replace businesses with BusinessData
          setBusinesses(response.data.businesses);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddButtonClicked = () => {
    setShowModal(true);
  };

  return (
    <>
      <Head>
        <title>Businesses</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>  {/* spacing={3} */}
            <Stack direction="row" justifyContent="space-between" spacing={4}>   {/* spacing={4} */}
              <Stack spacing={1}>
                <Typography variant="h4">{localStorage.getItem("userEmail") != "admin@adlinc.com"? "My" : "All"} Businesses</Typography>
                
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowUpOnSquareIcon /></SvgIcon>}>
                    Import
                  </Button>
                  <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon>}>
                    Export
                  </Button>
                </Stack> */}
              </Stack>

              {localStorage.getItem("userEmail") != "admin@adlinc.com" && (
              <div>
                <Button variant="contained" startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>} onClick={handleAddButtonClicked}>
                  Add
                </Button>
              </div>
              )}

            </Stack>
            {/* <BusinessesSearch /> */}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography variant="body2" color="error">
                Error fetching businesses: {error.message}
              </Typography>
            )}
            {businesses.length >= 0 && (
              <>
                <Grid container spacing={3} >
                  {businesses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((business, index) => (
                    <Grid xs={12} md={6} lg={4} key={business._id}>
                      <BusinessCard
                        BusinessName={business.BusinessName}
                        BusinessCategory={business.BusinessCategory}
                        BusinessLocation={business.BusinessLocation}
                        BusinessHours={business.BusinessHours}
                        _id={business._id}
                      />
                    </Grid>
                  ))}
                  {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      size="small"
                    />
                  </Box> */}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                  />
                </Box>
              </>
            )}
          </Stack>
        </Container>
      </Box>
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContent>
            <Business />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
