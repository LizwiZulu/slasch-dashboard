import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
//import { getInitials } from '../utils/get-initials';
import { SeverityPill } from 'src/components/severity-pill';
import UserProfileAdmin from '../../pages/users/users-admin';
import { useEffect, useState } from 'react';

const statusMap = {
  Pending: 'warning',
  Complete: 'success',
  Incomplete: 'error'
};

export const OwnersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 5,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const [currentBusiness, setCurrentBusiness] = useState({});
  const [isShowBusiness, setIsShowBusiness] = useState(false);
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(event.target.value);
  };

  const handleViewBusiness = (e, newBusiness) => {
    console.log("this is it ..... ", newBusiness)
    setCurrentBusiness(newBusiness);
    setIsShowBusiness(true);
  };
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((customer) => {
                const isSelected = selected.includes(customer._id);
                /* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */

                return (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={isSelected}
                    onClick={(e)=>{
                      handleViewBusiness(e, customer)
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id);
                          } else {
                            onDeselectOne?.(customer._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.profilePicture}>
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.firstname} {customer.surname}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.locationOrAddress}
                    </TableCell>
                    <TableCell>
                      {customer.phoneNumber}
                    </TableCell>
                    {/* <TableCell>
                      {customer.email}
                    </TableCell> */}
                    <SeverityPill color={statusMap[customer.status]}>
                      {customer.status}
                    </SeverityPill>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {isShowBusiness && (
        <UserProfileAdmin business = {currentBusiness}></UserProfileAdmin>
      )}
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OwnersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};

export default OwnersTable;