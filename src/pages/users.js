import { useCallback, useMemo, useEffect, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/user/users-table';
import { CustomersSearch } from 'src/sections/user/users-search';
import { applyPagination } from 'src/utils/apply-pagination';
import axios from 'axios';

const now = new Date();
const url = 'https://adlinc-api.onrender.com/api/slaschapp/admin/users';

const useCustomers = (page, rowsPerPage) => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail === "admin@adlinc.com") {
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          page: page + 1, // API uses 1-based indexing
          per_page: rowsPerPage,
        },
      })
        .then((response) => {
          setCustomers(response.data.UsersData);
          setTotal(response.data.total);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [page, rowsPerPage]); // Add page and rowsPerPage as dependencies

  return { customers, total };
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer._id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { customers, total } = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail === "admin@adlinc.com") {
      setIsLoading(true);
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log("Fetched users:", response.data.UsersData);
          setData(response.data.UsersData);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } 
  }, [page, rowsPerPage]);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      setRowsPerPage(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Users
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  All Users
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>


             {/*  <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                  </Button>
              </div> */}
            </Stack>
          {/*   <CustomersSearch /> */}
          {localStorage.getItem("userEmail") != "admin@adlinc.com" && (
              <div>
               <Typography variant="h6">Permission not granted</Typography>
              </div>
              )}
          {localStorage.getItem("userEmail") === "admin@adlinc.com" && (
              <UsersTable
              count={total}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={(value) => handleRowsPerPageChange(value)}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
              )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;