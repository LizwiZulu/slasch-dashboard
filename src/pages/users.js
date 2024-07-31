import { useCallback, useMemo, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography, Tab, Card } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/user/users-table';
import OwnersTable from 'src/sections/owners/owners-table';

import { applyPagination } from 'src/utils/apply-pagination';
import axios from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab'; // Import TabContext, TabList, and TabPanel from @mui/lab
import { SeverityPill } from 'src/components/severity-pill';


const now = new Date();
const url = 'https://adlinc-api.onrender.com/api/slaschapp/admin/users';
const ourl = 'https://adlinc-api.onrender.com/api/slaschapp/admin/owners';



const useCustomers = (page, rowsPerPage) => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userEmail = localStorage.getItem("role");
    if (userEmail === "admin") {
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {
          page: page + 1, // API uses 1-based indexing
          per_page: rowsPerPage,
        },
      })
        .then((response) => {
          console.log('Response ............', response)
          setCustomers(response.data.AllUsers);
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

const useOwners = (page, rowsPerPage) => {
  const [owners, setOwners] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const userEmail = localStorage.getItem("role");
    if (userEmail === "admin") {
      axios.get(ourl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {
          page: page + 1, // API uses 1-based indexing
          per_page: rowsPerPage,
        },
      })
        .then((response) => {
          setOwners(response.data.BusinessOwnersData);
          setTotal(response.data.total);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [page, rowsPerPage]); // Add page and rowsPerPage as dependencies

  return { owners, total };
};

const useOwnersSelection = (owners) => {
  const [selected, setSelected] = useState([]);

  const handleSelectAll = () => {
    setSelected(owners.map((owner) => owner._id));
  };

  const handleSelectOne = (ownerId) => {
    setSelected((prevSelected) => [...prevSelected, ownerId]);
  };

  const handleDeselectOne = (ownerId) => {
    setSelected((prevSelected) => prevSelected.filter((id) => id !== ownerId));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  return { selected, handleSelectAll, handleSelectOne, handleDeselectOne, handleDeselectAll };
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState('users');

  const { customers, total } = useCustomers(page, rowsPerPage);
  const customerIds = useCustomerIds(customers);
  const customersSelection = useSelection(customerIds);

  const { owners, total: ownersTotal } = useOwners(page, rowsPerPage);
  const ownersSelection = useOwnersSelection(owners);

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
          console.log("Fetched users:", response.data.AllUsers);
          setData(response.data.AllUsers);
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

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

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
          <Stack >
            <TabContext value={currentTab}>
              <TabList onChange={handleTabChange}>
                <Tab value="users" label="All Users" />
                <Tab value="owners" label="Business Owners" />
              </TabList>
              <TabPanel value="users">
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
              </TabPanel>
              <TabPanel value="owners">
                <OwnersTable
                  count={ownersTotal}
                  items={owners}
                  onDeselectAll={ownersSelection.handleDeselectAll}
                  onDeselectOne={ownersSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={(value) => handleRowsPerPageChange(value)}
                  onSelectAll={ownersSelection.handleSelectAll}
                  onSelectOne={ownersSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={ownersSelection.selected}
                />
              </TabPanel>
            </TabContext>
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