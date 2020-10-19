//React Imports
import React, { useEffect, useState } from "react";

//Material Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// Import react-circular-progressbar module and styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {Link} from "react-router-dom";
import ProgressProvider from "./ProgressProvider";
import Container from "@material-ui/core/Container";
import './Initial.css'
import { Paper } from "@material-ui/core";
import Store from 'store'

const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        height:'100%'
      },

}))

const paths=['fe','re','no','an','dj','an']

function Initial() {
    const [valueEnd, setValueEnd] = useState([0,0,0,0,0,0]);
    const[patharr,setpatharr]=useState([1,1,1,1,1,1])
  const classes = useStyles();
useEffect(()=>{
    let val=valueEnd
    let pathval=patharr
    paths.forEach((path,ind)=>{
      const leveldata= Store.get(path,{level:0,totallevel:-1})
      if(leveldata.totallevel==-1){
        
        val[ind]=0
      }else{
          val[ind]=Math.floor(((parseInt(leveldata.level)-1)/parseInt(leveldata.totallevel))*100)
          if(parseInt(leveldata.level)>parseInt(leveldata.totallevel)){
            pathval[ind]=parseInt(leveldata.totallevel)
          }else{
            pathval[ind]=parseInt(leveldata.level)
          }
        
      }
    })
    setValueEnd([...val])
    setpatharr([...pathval])
},[])

  return (
    <React.Fragment>
        <Container fixed >
            <div className='project-div'>
                <img src={require("../assest/coding.svg")} style={{width:'200px',alignSelf:'center',marginBottom:'2vh'}}/>
                <div> 
                    <h2 className='h2-centre'>
                        TECHPLAN
                    </h2>
                </div>   
                <Typography variant="body1" color="textSecondary" component="p" className='p-centre'>
                    Guided Learning Paths to start Open Source Learning. Go through each topic, follow along the videos, complete some projects and pass the quiz to go through to next topic. Happy Learning.
                </Typography>
            </div>
        </Container>
        <Paper className="main-d" >
            <Container fixed>
                <div style={{marginTop:'4vh'}}>
                    <h3 className='h2-centre'>LEARNING PATHS</h3>   
                    <ul className='project-list' >
                        <li className='project-paper' >
                          
                            <Card className={classes.root}>
                                <CardActionArea  >
                                    <CardContent  > 
                                        <div className="main-it">
                                            <ProgressProvider valueStart={0} valueEnd={valueEnd[0]}>
                                                {value => <CircularProgressbar value={value} text={`${value}%`} />}
                                            </ProgressProvider>
                                            <div className="main-list-heading">
                                                <Typography gutterBottom variant="h5" component="h3">
                                                   FRONTEND
                                                </Typography>
                                            </div>
                                            <div>              
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Begin your Web Devlopment Learning with Frontend. Learn to design and code website with HTML5 ,CSS3 and JS.
                                                </Typography>
                                            </div> 
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="main-list-button">
                                    <Link to={`/path?pid=${paths[0]}&sid=${patharr[0]}`}>
                                        <Button size="small" color="primary" variant="outlined">
                                            Continue
                                        </Button>
                                    </Link>                        
                                </CardActions>
                            </Card>
                        </li>
                        <li className='project-paper'>
                            <Card className={classes.root}>
                                <CardActionArea  >
                                    <CardContent  > 
                                        <div className="main-it">
                                            <ProgressProvider valueStart={0} valueEnd={valueEnd[1]}>
                                                {value => <CircularProgressbar value={value} text={`${value}%`} />}
                                            </ProgressProvider>
                                            <div className="main-list-heading">
                                                <Typography gutterBottom variant="h5" component="h3">
                                                   REACT
                                                </Typography>
                                            </div>
                                            <div>              
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Step up your Web Devlopment skills with most popular open source, javascript library React js.
                                                </Typography>
                                            </div> 
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="main-list-button">
                                    
                                        <Button size="small" disabled color="primary" variant="outlined">
                                            Coming Soon
                                        </Button>
                                                            
                                </CardActions>
                            </Card>
                        </li>
                        <li className='project-paper'>
                            <Card className={classes.root}>
                                <CardActionArea  >
                                    <CardContent  > 
                                        <div className="main-it">
                                            <ProgressProvider valueStart={0} valueEnd={valueEnd[2]}>
                                                {value => <CircularProgressbar value={value} text={`${value}%`} />}
                                            </ProgressProvider>
                                            <div className="main-list-heading">
                                                <Typography gutterBottom variant="h5" component="h3">
                                                    NODE
                                                </Typography>
                                            </div>
                                            <div>              
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                Learn behind the scene work of a website and take a step towards Fullstack Development with help of Node js.
                                                </Typography>
                                            </div> 
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="main-list-button">
                                    
                                        <Button size="small" disabled color="primary" variant="outlined">
                                            Coming Soon
                                        </Button>
                                                            
                                </CardActions>
                            </Card>
                        </li>
                        <li className='project-paper'>
                            <Card className={classes.root}>
                                <CardActionArea  >
                                    <CardContent  > 
                                        <div className="main-it">
                                            <ProgressProvider valueStart={0} valueEnd={valueEnd[3]}>
                                                {value => <CircularProgressbar value={value} text={`${value}%`} />}
                                            </ProgressProvider>
                                            <div className="main-list-heading">
                                                <Typography gutterBottom variant="h5" component="h3">
                                                    ANGULAR
                                                </Typography>
                                            </div>
                                            <div>              
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Learn Angular.js, a popular Typescript based web application framework, led by Google.
                                                </Typography>
                                            </div> 
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="main-list-button">
                                    
                                        <Button size="small" disabled color="primary" variant="outlined">
                                            Coming Soon
                                        </Button>
                                                            
                                </CardActions>
                            </Card>
                        </li>
                        <li className='project-paper'>
                            <Card className={classes.root}>
                                <CardActionArea  >
                                    <CardContent  > 
                                        <div className="main-it">
                                            <ProgressProvider valueStart={0} valueEnd={valueEnd[4]}>
                                                {value => <CircularProgressbar value={value} text={`${value}%`} />}
                                            </ProgressProvider>
                                            <div className="main-list-heading">
                                                <Typography gutterBottom variant="h5" component="h3">
                                                    DJANGO
                                                </Typography>
                                            </div>
                                            <div>              
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Learn Django, a popular framework used for creating backend of websites in Python Programming Languarge.
                                                </Typography>
                                            </div> 
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="main-list-button">
                                    
                                        <Button size="small" disabled color="primary" variant="outlined">
                                            Coming Soon
                                        </Button>
                                                            
                                </CardActions>
                            </Card>
                        </li>
                        <li className='project-paper'>
                            <Card className={classes.root}>
                                <CardActionArea  >
                                    <CardContent  > 
                                        <div className="main-it">
                                            <ProgressProvider valueStart={0} valueEnd={valueEnd[5]}>
                                                {value => <CircularProgressbar value={value} text={`${value}%`} />}
                                            </ProgressProvider>
                                            <div className="main-list-heading">
                                                <Typography gutterBottom variant="h5" component="h3">
                                                    ANDROID DEV
                                                </Typography>
                                            </div>
                                            <div>              
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Take your Web Development skills to mobile with react native to make apps for Android and Ios.
                                                </Typography>
                                            </div> 
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="main-list-button">
                                    
                                        <Button size="small" disabled color="primary" variant="outlined">
                                            Coming Soon
                                        </Button>
                                                            
                                </CardActions>
                            </Card>
                        </li>
                    </ul>
                </div>
            </Container>
        </Paper>
        <Container fixed>
            <footer>
                <div className="footer-div">
                    <div className="links"> 
                        <p>
                            AsAk is a group enthusiasts working on their dream of being a Software Devloper. We also have other Products like MeanMov Android App that gives meaning of all difficult words in a movie in single click. Do check it out at <a>MeanMov</a> 
                        </p>
                        <p class="copyright-text">
                            Copyright &copy; 2020 All Rights Reserved 
                        </p>
                    </div>
                    <div >     
                        <ul className="footer-links">
                            <li >
                            <Link> <p style={{textAlign:'center'}}> Frontend</p></Link>
                            </li>
                            <li >
                            <Link> <p style={{textAlign:'center'}}> React</p></Link>
                            </li>
                            <li >
                            <Link> <p style={{textAlign:'center'}}> Node</p></Link>
                            </li>
                            <li >
                            <Link> <p style={{textAlign:'center'}}> Angular</p></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </Container>
    </React.Fragment>
  );
}

  
  export default Initial;