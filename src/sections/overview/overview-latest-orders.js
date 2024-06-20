import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import axios from 'axios';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/profile/user/history';
const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("myToken");
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setOrders(response.data.orders);
        setLoading(false);

        console.log("Returned orders:", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          {/* <Typography color="text.secondary"
            display="inline"
            variant="body1" sx={{ pb: 2, px: 3 }} >You have no orders </Typography> */}
          {orders.length === 0 ? (
            <Typography color="text.secondary" display="inline" variant="body1" sx={{ pb: 2, px: 3 }}>
              There are no orders
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Order number
                  </TableCell>
                  <TableCell>
                    Code
                  </TableCell>
                  <TableCell sortDirection="desc">
                    Order price
                  </TableCell>
                  <TableCell>
                    Total Items
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => {

                  return (
                    <TableRow
                      hover
                      key={order.id}
                    >
                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {order.code}
                      </TableCell>
                      <TableCell>
                        {order.totalCartPrice}
                      </TableCell>
                      <TableCell>
                        {order.totalCartQuantity}
                      </TableCell>
                      {/* <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
          )}
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
