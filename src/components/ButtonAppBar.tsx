import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from "next/link";
import CssBaseline from "@mui/material/CssBaseline";

export default function ButtonAppBar() {
  return (
    <>
      {/*<CssBaseline/>*/}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
            <Link href="/" style={{textDecoration: 'none'}}>
              Home
            </Link>
          </Typography>
          <Link href="/signin" style={{textDecoration: 'none'}}>
            <Button color="warning">Login</Button>
          </Link>
          <Link href="/signup" style={{textDecoration: 'none'}}>
            <Button color="error">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
