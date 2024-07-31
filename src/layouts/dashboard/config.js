import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ArchiveBoxArrowDownIcon from '@heroicons/react/24/solid/ArchiveBoxArrowDownIcon';
import ChartPieIcon from '@heroicons/react/24/solid/ChartPieIcon';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import FlagIcon from '@heroicons/react/24/solid/FlagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import { BanknotesIcon, MegaphoneIcon } from '@heroicons/react/24/solid';

let items = [];

// Fix: Using loose comparison (==) for email check (not recommended for production)
if (typeof localStorage !== 'undefined' && localStorage.getItem("role") == "admin") {
  //console.log("IF STATEMENT EXECUTED");
  items = [
    
    {
      title: 'Users',
      path: '/users',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Businesses',
      path: '/businesses',
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Auctions',
      path: '/allauctions',
      icon: (
        <SvgIcon fontSize="small">
          <MegaphoneIcon />
          
        </SvgIcon>
      )
    },
    {
      title: 'Cash Out Requests',
      path: '/cashouts',
      icon: (
        <SvgIcon fontSize="small">
          <BanknotesIcon />
        </SvgIcon>
      )
    },
  ];
} else {
  console.log("ELSE STATEMENT EXECUTED");
  items = [
    {
      title: 'Overview',
      path: '/',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingCartIcon />
        </SvgIcon>
      )
    },
    /* {
      title: 'Auctions',
      path: '/auctions',
      icon: (
        <SvgIcon fontSize="small">
          <FlagIcon />
        </SvgIcon>
      )
    }, */
    {
      title: 'Business',
      path: '/business',
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Account',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      )
    },
  ];
}

export { items };
