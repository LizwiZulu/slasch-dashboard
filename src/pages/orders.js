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

const url = 'https://adlinc-api.onrender.com/api/slaschapp/profile/user/history';

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("myToken");
        const userId = localStorage.getItem("userId");
        const userEmail = localStorage.getItem("userEmail");
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setOrders(response.data.orders);
                setLoading(false);

                console.log(orders)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                <Container maxWidth="xl">
                    <Stack spacing={2}>

                        <Typography variant="h5" component="h2" gutterBottom>
                            Latest orders
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
                                                <TableCell>Order Number</TableCell>
                                                <TableCell>Code</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Total Price</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order, index) => (
                                                <TableRow
                                                    key={order._id}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#f5f5f5',
                                                        },
                                                    }}
                                                >
                                                    <td>
                                                        <Link href={`/order/${order._id}`} underline="none">
                                                            <TableCell>{index + 1}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/order/${order._id}`} underline="none">
                                                            <TableCell>{order.code}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/order/${order._id}`} underline="none">
                                                            <TableCell>{order.totalCartQuantity}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/order/${order._id}`} underline="none">
                                                            <TableCell>{order.totalCartPrice}</TableCell>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link href={`/order/${order._id}`} underline="none">
                                                            <TableCell>
                                                                <SeverityPill color={statusMap[order.status]}>
                                                                    {order.status}
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