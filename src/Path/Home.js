//React Imports
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {Link, useLocation, useHistory} from "react-router-dom"

//Material Links
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Other Imports
import Store from 'store'

//File Links
import './Home.css'
import Alert from './alert'
import Quiz from './quiz'
import Service from '../api/Service'

library.add(fab);

const useStyles = makeStyles(theme => ({
    fabright: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
      },
    quiz:{
        position: 'fixed',
        top: theme.spacing(9.5),
        right: theme.spacing(2),
        backgroundImage:'linear-gradient(45deg, #ff0f7b, #f89b29)'
     
        
    },
    fableft:{
        position: 'fixed',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
    root: {
        width:'100%',
        height:'100%'
      },
  
  }));



  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }


function Home(params) {

const classes = useStyles();
let history = useHistory();
let query = useQuery();


const [quizWindow,setquizWindow]=useState(false)
const [dataLoading,setDataLoading] =useState(true)
const [error,seterror] =useState(false)
const [data,setData]=useState()
const [totalLevel, setTotalLevel] =useState()
const [levelData,setLevelData] =useState()


function  windowSwitch() {
    setquizWindow((prev)=>{
        return !prev
    })
}
function InputData(pid,sid) {

   
    Service.getMainData(pid,sid).then(res=>{
        if(res.data.main==-1){
            seterror(true)
        }
        else{
            setData(res.data.main)
            setTotalLevel(res.data.total)
            setDataLoading(false)
        }
        
    })
}

function MoveWindows(leftBool) {
    const pid=query.get('pid')
    history.push(`/path?pid=${pid}&sid=${leftBool?levelData.left:levelData.right}`)
    
}

function currentLevel(pid,sid){
    let currLevel=Store.get(pid,{'level':1,'totallevel':totalLevel})
    if(sid>currLevel.level){
        history.push(`/path?pid=${pid}&sid=${currLevel.level}`)
    }
    let left = parseInt(sid)-1
    let right =parseInt(sid)+1
    console.log(sid)
    console.log(totalLevel)
    if (right==totalLevel+1 || right>currLevel.level){
        right=0
    }

   console.log(right)

    setLevelData({left,right})

}

useEffect(()=>{
    const pid=query.get('pid')
    const sid= query.get('sid')
    InputData(pid,sid)
    currentLevel(pid,sid)
    

},[])


    return(
        <React.Fragment>
           {dataLoading? error? <h3 style={{marginTop:'150px'}}>404 NOT FOUND</h3> :<></>:  quizWindow ? <Quiz data={data.quiz} total={totalLevel} />:
            <div>
            <Container fixed>
            <div>
                
                <div className='heading'>
                <FontAwesomeIcon icon={['fab',data.icon]} size='6x' />
                    <h2>
                       {data.title}
                    </h2>
                    <p className='heading-text'>
                        {data.topic_desc}
                    </p>
                </div>
            </div>
            </Container>
            <Alert/>
            <hr style={{height:'2px',borderWidth:0,color:'lightgray',backgroundColor:'lightgray',marginBottom:'5vh'}}/> 
            <Container fixed>
           
                <div>
                    <h3 className='h3-centre'>
                        LEARNING RESOURCES (Complete any one)
                    </h3>
                    <ul className='u-tube-list' >
                    {data.youtube_videos.map(url=>(
                            <li>
                                <iframe allowFullScreen="allowFullScreen" className='u-tube' src={url.src} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen " ></iframe>
                            </li>
                        ))}
                    </ul>
                </div>
               
                </Container>
                
                <hr style={{height:'2px',borderWidth:0,color:'lightgray',backgroundColor:'lightgray'}}/> 
                <Container fixed>
                <div className='project-div'>
                    <h3 className='h3-centre'>
                        PROJECTS AND ADDITIONAL TOPICS
                    </h3>
                    <ul className='project-list'>
                        {data.projects.map(project=>(
                                <li className='project-paper'>
                                <Card className={classes.root}>
                                    <CardActionArea >
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {project.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                           {project.descp}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <a  href={project.link} target="_blank" rel='noopener noreferrer'><Button size="small" color="primary" >
                                        Learn More
                                        </Button></a>
                                      
                                    </CardActions>
                                </Card>
                            </li>
                        ))}
                        
                      
                    </ul>
                    
                </div>
                
                </Container>
                <div >
            
                <Fab color="primary" variant="extended" className={classes.fabright} onClick={()=>MoveWindows(false)} disabled={levelData.right==0|| (levelData.right>totalLevel)}>
                    <AssignmentIcon className={classes.extendedIcon}/>
                  {levelData.right>totalLevel?'Completed':'Next Topic'}  
                </Fab>
                <Fab color="primary" variant="extended" className={classes.fableft} onClick={()=>MoveWindows(true)} disabled={levelData.left==0}>
                    <AssignmentIcon className={classes.extendedIcon}/>
                    Previous Topic
                </Fab>
         
              
                </div>
                </div>
  }
       
  {dataLoading?<></>:  <Fab color="primary" variant="extended" className={classes.quiz} onClick={windowSwitch}>
                    <AssignmentIcon className={classes.extendedIcon}/>
                 {quizWindow?'Topic':'Quiz'}   
                </Fab>
 }
        </React.Fragment>
    )
}


export default  Home