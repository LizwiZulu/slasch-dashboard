import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  MenuItem,
  Select,
  Button,
  Modal,
} from '@mui/material';

const CustomerDetails = ({data}) => {

  const [openModal, setOpenModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);


  const handleOpenModal = (document) => {
    setSelectedDocument(document);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDocument(null);
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Box display="flex" bgcolor={'white'} borderRadius={'10px'} justifyContent="space-between" alignItems="center">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {data?.name}
              </Typography>
              <Typography variant="body1">{data?.email}</Typography>
              <Typography variant="body1" sx={{mt: 1}}>{data?.address}</Typography>
              <Typography variant='body2' sx={{mt: 1}}>{data?.created_at}</Typography>
            </CardContent>
            <CardActions>
                <Button
                  variant="contained"
                  color={'success'}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color={'error'}
                  style={{ marginLeft: '8px' }}
                >
                  Decline
                </Button>
              </CardActions>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>
              <List>
                {data.documents.map((document, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={document.name} />
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(document)}
                      >
                        View
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-document-view"
        aria-describedby="modal-document-description"
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '75%',
            height: '75%',
            backgroundColor: 'white',
            boxShadow: 24,
            padding: '16px',
            borderRadius: '12px'
          }}
        >
          <iframe
            src={`/${selectedDocument?.path}#toolbar=0`}
            width="100%"
            height="100%"
            title={selectedDocument?.name}
            style={{
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CustomerDetails;