//React Imports
import React, { useState } from "react";

//Material Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {Link} from "react-router-dom";


import DrawerMod from './drawer'
import './nav.css'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

}))



function Nav() {
  const classes = useStyles();


  return (
  
          <nav>
          <AppBar position='fixed' color='inherit'>
        <Toolbar>
        <DrawerMod/>
        
          <Typography variant="h6" className={classes.title}>
            <Link to='/'>Techplan</Link> 
          </Typography>
         <a href="mailto:kumarpankaj2999@gmail.com"> <Button color="inherit">Contact Us</Button></a>
          
        </Toolbar>
      </AppBar>
          </nav>
      
  );
}

  
  export default Nav;