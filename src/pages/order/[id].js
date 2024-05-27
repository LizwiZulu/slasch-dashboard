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
import { SeverityPill } from 'src/components/severity-pill';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/cart/';

const statusMap = {
  Pending: 'warning',
  Complete: 'success',
  Incomplete: 'error'
};

const Page = () => {
  const router = useRouter();
  const orderId = router.query.id; // Get the order ID from the URL

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setOrder(response.data.cart);
        setStatus(response.data.status);
        setLoading(false);

        console.log(response.data)
      } catch (error) {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      let total = 0;
      order.baits.forEach((item) => {
        total += item.price /* * item.quantity */;
      });
      setTotalPrice(total);
    }
  }, [order]);

  return (
    <>
      <Head>
        <title>Order</title>
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
                  <Typography variant="h5">Order Details</Typography>
                  <Card>
                    <CardContent>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>  <Typography color="text.secondary" variant="body2">
                                Auction Name
                              </Typography></TableCell>
                              <TableCell>{order.auctionName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell> <Typography color="text.secondary" variant="body2">
                                Payment Method
                              </Typography></TableCell>
                              <TableCell>{order.paymentMethod}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><Typography color="text.secondary" variant="body2">
                                Total Items
                              </Typography></TableCell>
                              <TableCell>{order.totalCartQuantity}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><Typography color="text.secondary" variant="body2">
                                Total Price
                              </Typography></TableCell>
                              <TableCell>{order.totalCartPrice}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><Typography color="text.secondary" variant="body2">
                                Status
                              </Typography></TableCell>
                              <TableCell>
                                <SeverityPill color={statusMap[order.status]}>
                                  {order.status}
                                </SeverityPill>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Stack>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardHeader title="Order Items" />
                    <CardContent>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Item Number</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.baits.map((bait, index) => (
                              <TableRow key={bait._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{bait.baitName}</TableCell>
                                <TableCell>{bait.quantity}</TableCell>
                                <TableCell>{bait.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                {/* <Stack item xs={12} sm={6} md={4} lg={3} container direction="row"
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
                </Stack> */}
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