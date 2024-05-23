import React, { useState, useEffect } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    Card,
    Box,
    CardContent,
    Container,
    Stack,
    Typography,
    CircularProgress,
} from '@mui/material';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
    Pending: 'warning',
    Complete: 'success',
    Incomplete: 'error'
};

const url = 'https://adlinc-api.onrender.com/api/slaschapp/cart/bait';

const Page = () => {
    /// const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [carts, setCarts] = useState([
        {
            _id: '1',
            cartNumber: 'Cart 1',
            cartCode: 'CODE1',
            status: 'Incomplete',
        },
        {
            _id: '2',
            cartNumber: 'Cart 2',
            cartCode: 'CODE2',
            status: 'Pending',
        },
        {
            _id: '3',
            cartNumber: 'Cart 3',
            cartCode: 'CODE3',
            status: 'Complete',
        },
    ]);

    /* useEffect(() => {
      const token = localStorage.getItem("myToken");
      const userId = localStorage.getItem("userId");
      const userEmail = localStorage.getItem("userEmail");
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setCarts(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []); */

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                <Container maxWidth="xl">
                    <Stack spacing={2}>

                        <Typography variant="h5" component="h2" gutterBottom>
                            Carts
                        </Typography>
                        <Card sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            p: 2,
                        }}>
                            <CardContent>

                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Cart Number</TableCell>
                                                <TableCell>Cart Id</TableCell>
                                                <TableCell>Cart Code</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {carts.map(cart => (
                                                <TableRow
                                                    key={cart._id}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#f5f5f5',
                                                        },
                                                    }}
                                                >
                                                    <td>
                                                        <Link href={`/cart/${cart._id}`} underline="none">
                                                            <TableCell>{cart.cartNumber}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/cart/${cart._id}`} underline="none">
                                                            <TableCell>{cart._id}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/cart/${cart._id}`} underline="none">
                                                            <TableCell>{cart.cartCode}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/cart/${cart._id}`} underline="none">
                                                            <TableCell>
                                                                <SeverityPill color={statusMap[cart.status]}>
                                                                    {cart.status}
                                                                </SeverityPill>
                                                            </TableCell>
                                                        </Link>
                                                    </td>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box >
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;