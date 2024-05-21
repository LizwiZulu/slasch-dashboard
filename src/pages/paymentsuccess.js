import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => (
  <>
    <Head>
      <title>
        Payment Successful
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Payment successful"
              //src="https://img.freepik.com/free-vector/concept-credit-card-payment-landing-page_52683-24923.jpg?t=st=1716241857~exp=1716245457~hmac=dfe67b1e913a3de9208b0d3ee5b94e2e96b15d62a00f3088b90fef008ced0be1&w=740"
              src="/assets/errors/payment-success.jpg"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 500
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            Your payment is successful
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            Thank you for your payment. An automated payment receipt will be sent to you registered email adress. 
          </Typography>
          <Button
            component={NextLink}
            href="/"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            )}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

/* Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
); */

export default Page;
