import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon, Typography
} from '@mui/material';

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;

 /*  const [products, setOrders] = useState([]);
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
  }, []); */

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Baits" />
      <Typography color="text.secondary"
      display="inline"
      variant="body1" sx={{pb:2, px: 3}} > No baits available </Typography>
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(product.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
              <ListItemAvatar>
                {
                  product.image
                    ? (
                      <Box
                        component="img"
                        src={product.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
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

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
