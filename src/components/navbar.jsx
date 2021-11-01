import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          IA
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
