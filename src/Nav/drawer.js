import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Link} from "react-router-dom"
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Store from 'store'
//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab);
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {

  const paths=['fe','re','no','an','dj','an']
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const[patharr,setpatharr]=useState([1,1,1,1,1,1])

useEffect(()=>{

  let pathval=patharr
  paths.forEach((path,ind)=>{
    const leveldata= Store.get(path,{level:0,totallevel:-1})
    if(leveldata.totallevel!=-1){
      if(parseInt(leveldata.level)>parseInt(leveldata.totallevel)){
        pathval[ind]=parseInt(leveldata.totallevel)
      }else{
        pathval[ind]=parseInt(leveldata.level)
      }
  
    }
  })

  setpatharr([...pathval])
},[])




  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home'].map((text, index) => (
         <Link to={'/'}><ListItem button key={text}>
            <ListItemIcon> <Home style={{color:'black'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem></Link>
        ))}
      </List>
      <Divider />
      <List>
        
          <Link to={`/path?pid=fe&sid=${patharr[0]}`}><ListItem button key='frontend' >
            <ListItemIcon><img src={require('../assest/f.svg')} style={{width:'30px'}}/></ListItemIcon>
            <ListItemText >Frontend</ListItemText>
          </ListItem></Link>
           <ListItem button key='react'>
            <ListItemIcon> <FontAwesomeIcon icon={['fab','react']} size='2x' style={{color:'black'}} /></ListItemIcon>
            <ListItemText >React</ListItemText>
          </ListItem>
           <ListItem button key='node'>
            <ListItemIcon><FontAwesomeIcon icon={['fab','node']} size='2x'style={{color:'black'}} /></ListItemIcon>
            <ListItemText >Node</ListItemText>
          </ListItem>
           <ListItem button key='angular'>
            <ListItemIcon><FontAwesomeIcon icon={['fab','angular']} size='2x' style={{color:'black'}} /></ListItemIcon>
            <ListItemText >Angular</ListItemText>
          </ListItem>
           <ListItem button key='django'>
            <ListItemIcon><img src={require('../assest/d.svg')} style={{width:'30px'}}/></ListItemIcon>
            <ListItemText >Django</ListItemText>
          </ListItem>
           <ListItem button key='ans'>
            <ListItemIcon><FontAwesomeIcon icon={['fab','android']} size='2x' style={{color:'black'}} /></ListItemIcon>
            <ListItemText >Android</ListItemText>
          </ListItem>
       
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
 
          </IconButton>
       
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

