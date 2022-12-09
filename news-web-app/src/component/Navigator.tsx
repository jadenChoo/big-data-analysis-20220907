import * as React from 'react';

import Drawer, { DrawerProps } from '@mui/material/Drawer';
import {NEWS_SEARCH_PATH, NEWS_TRENDS_PATH, SENTIMENT_TRENDS_PATH } from '../App';
import {useLocation, useNavigate} from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FindInPageIcon from "@mui/icons-material/FindInPage";

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
  const navigate = useNavigate();
  const {pathname,search} = useLocation();

  const menus = [
    { title: "News Search", path: NEWS_SEARCH_PATH, icon: <FindInPageIcon /> },
    {title : "News Trends", path : NEWS_TRENDS_PATH, icon: <ShowChartIcon />},
    {title : "Sentiments trends", path : SENTIMENT_TRENDS_PATH, icon: <FavoriteIcon />},
  ]

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          News Analytics
        </ListItem>
        {menus.map(({title, path, icon}) => (
            <ListItem key={path} sx = {{p:0}}>
              <ListItemButton sx={item} selected={pathname === path} onClick={() => { navigate(path + search); }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{title}</ListItemText>
              </ListItemButton>
          </ListItem>
          ))}
      </List>
    </Drawer>
  );
}