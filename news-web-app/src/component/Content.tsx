import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by keywords"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        No results found yet
      </Typography>
    </Paper>
  );
}