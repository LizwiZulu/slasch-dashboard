import React, {useState} from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Modal,
  Chip,
  CardActions,
} from '@mui/material';

const CompanyDetails = ({data}) => {

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
                  {data.name}
                </Typography>
                <Typography variant="body1">{data.description}</Typography>
                <Chip label={data?.category} variant="outlined" sx={{mt: 2}} />
                <Typography variant='body2' sx={{mt: 1, ml: 1}}>{data?.created_at}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color={'primary'}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color={'secondary'}
                  style={{ marginLeft: '8px' }}
                >
                  Decline
                </Button>
              </CardActions>
            </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shareholders
              </Typography>
              <List>
                {data?.shareholders?.map((shareholder, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={shareholder?.name}
                        secondary={shareholder?.email || '--'}
                      />
                    </ListItem>
                    {index !== data.shareholders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>
              <List>
                {data.documents.map((document, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={document.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(document)}
                    >
                      View
                    </Button>
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
          
          }}
        >
          <iframe
            src={`/${selectedDocument?.path}`}
            width="100%"
            height="100%"
            title={selectedDocument?.path}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CompanyDetails;