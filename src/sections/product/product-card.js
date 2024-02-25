import PropTypes from 'prop-types';
import { Button, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Image from 'next/image';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';

export const ProductCard = (props) => {
    const { product } = props;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                    <div style={{borderRadius: '5px', overflow: 'hidden'}}>
                    <Image
                        src={product.image}
                        alt='Product image 1'
                        style={{
                            objectFit: 'cover',
                        }}

                        width= '500'
                        height="250"
                    />
                    </div>
                   

                </Box>
                <Typography
                    align="left"
                    gutterBottom
                    variant="h5"
                >
                    {product.title}
                </Typography>
                <Typography
                    align="left"
                    variant="body1"
                >
                    {product.description}
                </Typography>
            </CardContent>

            <Box sx={{ flexGrow: 1 }} />

            <Divider />

            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2 }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                    
                >
                    {/*  <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                        <ClockIcon />
                    </SvgIcon> */}
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="h5"
                    >
                        {product.price}
                    </Typography>
                </Stack>

                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                    
                >
                
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="body"
                    >
                        {product.instock} in stock
                    </Typography>


                </Stack>

                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                    
                >

                    <div>
                        <Button
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <PencilIcon />
                                </SvgIcon>
                            )}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </div>

                </Stack>
            </Stack>
        </Card>
    );
};

ProductCard.propTypes = {
    company: PropTypes.object.isRequired
};
