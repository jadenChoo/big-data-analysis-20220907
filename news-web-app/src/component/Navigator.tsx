import * as React from 'react';

import Drawer, { DrawerProps } from '@mui/material/Drawer';

import FavoriteIcon from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const item = {
  py: 2,
  px: 2,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 3,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          News Analytics
        </ListItem>
          <ListItem sx={{p: 0}}>
            <ListItemButton sx={item} >
                <ListItemIcon> <ShowChartIcon /> </ListItemIcon>
                <ListItemText> News Trends</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{p: 0}}>
            <ListItemButton sx={item} >
                <ListItemIcon> <FavoriteIcon /> </ListItemIcon>
                <ListItemText> Sentiments trends</ListItemText>
            </ListItemButton>
          </ListItem>
      </List>
    </Drawer>
  );
}