import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";
import { HomeIcon, CurrencyDollarIcon, UserIcon, WrenchScrewdriverIcon, CircleStackIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Inicio", to: "/", current: true, icon: HomeIcon },
  { name: "Ahorro", to: "/cajaAhorro", current: false, icon: CurrencyDollarIcon },
  { name: "Index10", to: "/index10", current: false, icon: UserIcon },
  { name: "Utilidades", to: "/utilidades", current: false, icon: WrenchScrewdriverIcon },
  { name: "TestQuery", to: "/testQuery", current: false, icon: CircleStackIcon },
];


export const mainListItems = (
  <React.Fragment>
    {navigation.map((item, index) => (
      <ListItemButton key={index} component={Link} to={item.to}>
        <ListItemIcon>          
          {item.icon && (<item.icon className="size-4 text-blue-500 mr-2" /> )}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton component={Link} to="/login">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
 