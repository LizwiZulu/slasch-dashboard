import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CompanyDetails from 'src/sections/verification/business';
import CustomerDetails from 'src/sections/verification/customer';

const data = {
  name: 'James Bond',
  email: 'jamesb@gmail.com',
  address: '4 Bowen Avenue, Glemore, Durban, 4001',
  documents: [
              {name: "Personal Identification - James", path: 'sample.pdf'}, 
              {name: "Physcial Address", path: 'sample.pdf'}],
  created_at: '02 June 2024 09:12PM'
}

const Page = () => (
    <>
      <Head>
        <title>
          Cutsomer Verification 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography variant="h4">
                Customer 
            </Typography>
            <Typography variant='body1'>Verification Process</Typography>
            <CustomerDetails data={data} />
          </Stack>
        </Container>
      </Box>
    </>
  );
  
  Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;
  