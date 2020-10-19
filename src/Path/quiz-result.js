import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory} from "react-router-dom"

import CircularProgress from './circularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts({path_id,level_id,total,result,proceed,reset }) {
let history = useHistory();

const classes = useStyles();
const [open, setOpen] = React.useState(true);


function NextTopicFun() {
 
  history.push(`/path?pid=${path_id}&sid=${parseInt(level_id)+1}`)
}

return (
  <div className={classes.root}>
    <Collapse in={open}>
      <Alert  severity={result.pass?'success':'error'}
    
      >
      <div className='alert-div'>
<div ><h2 className='pass-h3'>{result.pass?'Passed':'Fail'}</h2><h3 className='score'>{result.maxScore}/{result.total}</h3></div>
          <div style={{marginRight:'2vw'}}>
          <Button variant='contained' color='secondary' style={{marginRight:'1vw'}} onClick={reset}>RETRY</Button>
          <Button variant='contained' color='primary' disabled={!proceed || parseInt(level_id)>=parseInt(total) } onClick={NextTopicFun}>NEXT TOPIC</Button></div>
    
          
          

      </div>
      </Alert>
    </Collapse>
    
  </div>
);
}