import axios from 'axios';
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
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProductSearch } from 'src/sections/baitplants/baitplant-search';
import { BaitplantCard } from 'src/sections/baitplants/baitplant-card';
import { useState, useEffect } from 'react';

const fetchProducts = async () => {
  const response = await axios.get('https://adlinc-api.onrender.com/api/slaschapp/admin/baits');
  return response.data;
};

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
               <Stack spacing={1}>
                <Typography variant="h4">Bait Plants</Typography>

                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
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
            {/* <ProductSearch /> */}
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product.id}>
                  <BaitplantCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;