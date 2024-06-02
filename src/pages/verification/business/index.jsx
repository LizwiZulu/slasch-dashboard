import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CompanyDetails from 'src/sections/verification/business';

const data = {
  name: 'Nueng Co.',
  description: 'Web development and services',
  shareholders: [{name: 'James Bond', email: 'jamesb@nueng.co.za'},  {name: 'Jane Dena', email: 'janed@nueng.co.za'}],
  category: 'Information Technology',
  documents: [{name: "Shareholder Agreement", path: 'sample.pdf'}, 
              {name: "Shareholder Identification - James", path: 'sample.pdf'}, 
              {name: "Shareholder Identification - Jane", path: 'sample.pdf'}],
  created_at: '20 May 2024 11:15AM'
}

const Page = () => (
    <>
      <Head>
        <title>
          Business Verification 
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
                Business 
            </Typography>
            <Typography variant='body1'>Verification Process</Typography>
            <CompanyDetails data={data}/>
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
  