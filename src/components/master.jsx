import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AppBar, Typography, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PerceptronSimulacion from "./perceptron/perceptronSimulacion";
import PerceptronMaster from "./perceptron/perceptronMaster";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
}));

const Master = () => {
  const classes = useStyles();
  return (
    <Router>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            IA
          </Typography>
          <Button variant="text" color="inherit">
            <Link className="link-nav" to="/perceptron/">
              Perceptron
            </Link>
          </Button>
          <Button variant="text" color="inherit">
            <Link className="link-nav" to="/bradial/">
              Base Radial
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
      <Route path={"/perceptron/"} component={PerceptronMaster} />
      <Route exact path={"/bradial/"} component={PerceptronSimulacion} />
    </Router>
  );
};

export default Master;
