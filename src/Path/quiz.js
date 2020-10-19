//React Imports
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';

//Font Awesome
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Other Imports
import Store from 'store'

//File Import
import QuizResult from './quiz-result'



export default function Home({data,total}) {

const [optionGraph,setOptionGraph]=useState(InitializingOptionGraph(data.qna))
const [selectedArray,setselectedArray] =useState(InitializingSelectedArray(data.qna))
const [result,setResult]=useState({maxScore:0,total:1,pass:false})
const [currentresult,setcurrentResult]=useState({maxScore:0,total:1,pass:false})
const [showResult,setshowResult] =useState(false)
const [submitButton,setsubmitButton] = useState(false)
const [proceed,setProceed]=useState(false)

function InitializingOptionGraph (qna){
    let ans=[]
    qna.forEach(qa=>{
        ans.push([0,0,0,0])
    })
    return ans
}

function InitializingSelectedArray (qna){
    let ans=[]
    qna.forEach(qa=>{
        ans.push(-1)
    })
    return ans
}

function ChangeColor (qindex,oindex){
    let tempOG= optionGraph
    let tempSA =selectedArray
    if(tempSA[qindex]!=-1){
        tempOG[qindex][tempSA[qindex]]=0
    }
    tempOG[qindex][oindex]=1
    tempSA[qindex]=oindex
    setselectedArray([...tempSA])
    setOptionGraph([...tempOG])
}
function ChangeColorFinal (qindex,oindex,num){
    let tempOG= optionGraph
    tempOG[qindex][oindex]=num
    setOptionGraph([...tempOG])
}

function ColorSelector(qindex,oindex){
    let tempid=optionGraph[qindex][oindex]
   
    if(tempid==0) {
      return '#E0E0E0'
    }
    else if(tempid==1){
        return '#269dde'
    }
    else if(tempid==2){
        return '#2bd106'
    }
    else if(tempid==3){
        return '#de1310 '
    }

    
}

function SubmitQuiz() {
    setsubmitButton(true)
    let ansArr=data.ansArray
    const totalScore= ansArr.length
    let currentScore=0
    selectedArray.forEach((selectedOption,qindex)=>{
        if(selectedOption==-1){
           
        }
        else{
            if(selectedOption==ansArr[qindex]){
                ChangeColorFinal(qindex,selectedOption,2)
                currentScore=currentScore+1
            }else{
                ChangeColorFinal(qindex,ansArr[qindex],2)
                ChangeColorFinal(qindex,selectedOption,3)
            }
        }
        let pass = false
        if((currentScore/totalScore)>=0.5){
           
            Store.set(data.path_id,{level:parseInt(data.path_level)+1,totallevel:total})
            console.log(data.path_level)
            pass=true
            let maxScore=Store.get(`${data.path_id}-${data.path_level}`,{maxScore:currentScore,total:totalScore,pass:true})
            if(currentScore>=maxScore.maxScore){
                Store.set(`${data.path_id}-${data.path_level}`,{maxScore:currentScore,total:totalScore,pass:true})
            }

        }
        let resultObj={maxScore:currentScore,total:totalScore,pass:pass}
        if(result.pass || pass){
           
            setProceed(true)
        }
        
        setcurrentResult(resultObj)
        setshowResult(true)
    })
}

function ResetQuiz() {
    StoreImport()
    setOptionGraph(InitializingOptionGraph(data.qna))
    setselectedArray(InitializingSelectedArray(data.qna))
    setshowResult(false)
    setsubmitButton(false)

}

function StoreImport() {
    let ab= Store.get(`${data.path_id}-${data.path_level}`,{maxScore:0,total:1,pass:false})
    setResult(ab)
    setcurrentResult(ab)
}

useEffect(()=>{
    StoreImport()

},[])

return (
    <React.Fragment>
         <Container maxWidth='sm'>
            <div>
                
                <div className='heading'>
                <FontAwesomeIcon icon={faQuestionCircle} size='6x'/>
                    <h2>
                        QUIZ
                    </h2>
                    </div>
                    <ol className='quiz-ol'>
                        {data.qna.map((qa,qindex)=>(
                             <li className='quiz-li'>
                             <h3>{qa.ques}</h3>
                         
                     
                         <ButtonGroup
                             className='quiz-option'
                             orientation="vertical"
                             color='inherit'
                             aria-label="vertical contained primary button group"
                             variant="contained"
                             >
                                 {qa.op.map((option,oindex)=>(
                                      <Button onClick={()=>{ChangeColor(qindex,oindex)}} style={{backgroundColor:ColorSelector(qindex,oindex)}}>{option}</Button>
                                 ))}
                            
                             
                         </ButtonGroup>
                         
                         </li>
                        ))}
                       
                        
                    </ol>

                    <div className='result-div'>
                        <div className='submit-button'><Button variant='contained' color='primary' onClick={SubmitQuiz} disabled={submitButton}>SUBMIT</Button></div>
                            {showResult? <QuizResult path_id={data.path_id} level_id={data.path_level} total={total} result={currentresult} proceed={proceed} reset={ResetQuiz} />:<></>} 
                        </div>
                    </div>
                    </Container>

    </React.Fragment>
)

}