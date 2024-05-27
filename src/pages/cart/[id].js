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

const url = 'https://adlinc-api.onrender.com/api/slaschapp';
const Page = () => {

  const router = useRouter();
  const cartId = router.query.id; // Get the order ID from the URL

  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${url}/${cartId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });
        setCart(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCartData();
  }, [orderId]);

  useEffect(() => {
    if (cart) {
      let total = 0;
      cart.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    }
  }, [cart]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await axios.patch(`/api/orders/${cartId}`, { status: newStatus }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
      setCart(response.data);
      setStatus(response.data.status);
    } catch (error) {
      setError(error);
    }
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

                <Typography variant="h5">Order Information</Typography>

                  <Card>
                    <CardContent>
                      <Typography variant="h6">Order ID: {id}</Typography>
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