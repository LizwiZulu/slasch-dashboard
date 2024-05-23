import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Grid,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Box
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const Page = () => {

  const [cart, setCart] = useState({
    id: '1',
    status: 'pending',
    items: [
      {
        id: '1',
        name: 'Item 1',
        quantity: 2,
        price: 10.99,
      },
      {
        id: '2',
        name: 'Item 2',
        quantity: 3,
        price: 9.99,
      },
      {
        id: '3',
        name: 'Item 3',
        quantity: 1,
        price: 12.99,
      },
      {
        id: '4',
        name: 'Item 4',
        quantity: 2,
        price: 8.99,
      },
      {
        id: '5',
        name: 'Item 5',
        quantity: 3,
        price: 15.99,
      },
    ],
  });
  const [status, setStatus] = useState(cart.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const id = '1'; // extract the ID from the URL

  useEffect(() => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const handleUpdateStatus = (newStatus) => {
    setCart({ ...cart, status: newStatus });
    setStatus(newStatus);
  };

  const handleCancelOrder = () => {
    handleUpdateStatus('cancelled');
  };

  const handleCompleteOrder = () => {
    handleUpdateStatus('complete');
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>
            {loading ? (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <Stack spacing={2}>

                <Typography variant="h5">Cart Information</Typography>

                  <Card>
                    <CardContent>
                      <Typography variant="h6">Cart ID: {id}</Typography>
                      <Typography variant="h6">Status: {status}</Typography>
                      <Typography variant="h6">Total Price: {totalPrice}</Typography>
                    </CardContent>
                  </Card>
                </Stack>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardHeader title="Cart Items" />
                    <CardContent>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cart.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Stack item xs={12} sm={6} md={4} lg={3} container direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCompleteOrder}
                  >
                    Complete Order
                  </Button>
                </Stack>
              </>
            )}
            {error && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" color="error">
                  {error.message}
                </Typography>
              </Grid>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;