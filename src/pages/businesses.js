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
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BusinessCard } from 'src/sections/businesses/business-card';
import { BusinessesSearch } from 'src/sections/businesses/businesses-search';
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/business';

const Page = () => {
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    if (token) {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Fetched companies:", response.data.businesses);
          setBusinesses(response.data.businesses);
          setTotalPages(Math.ceil(response.data.length / 10));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Head>
        <title>Businesses</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">My Businesses</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowUpOnSquareIcon /></SvgIcon>}>
                    Import
                  </Button>
                  <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon>}>
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button variant="contained" startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>}>
                  Add
                </Button>
              </div>
            </Stack>
            <BusinessesSearch />
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
            {businesses.length > 0 && (
              <>
                <Grid container spacing={3}>
                  {businesses.map((business, index) => (
                    <Grid xs={12} md={6} lg={4} key={business._id}>
                      <BusinessCard
                        BusinessName={business.BusinessName}
                        BusinessCategory={business.BusinessCategory}
                        BusinessLocation={business.BusinessLocation}
                        BusinessHours={business.BusinessHours}
                      />
                    </Grid>
                  ))}
                  {/* {companies.slice((page - 1) * 10, page * 10).map((company) => (
                    <Grid xs={12} md={6} lg={4} key={company.id}>
                      <CompanyCard 
                      company={company} />
                      
                    </Grid>
                  ))} */}
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;