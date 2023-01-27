import { useReducer } from 'react';
import './App.css';
import Box from './component/Box';

let initialState = {
  boxArray : Array(13).fill(0).map(item => item = Array(30).fill('simple')),
  stage : 1,
  source : ['-1' , '-1'],
  target : ['-1' , '-1']
}

const gameHandler = (state , action) => {
  let newBoxArray = [...state.boxArray];
  const {row , col} = {...action.payload}
  switch (action.type) {
    case 'makeSource' : 
      newBoxArray[row][col] = "source";
      return {...state , boxArray:newBoxArray , stage:2};
    case 'makeTarget' :
      newBoxArray[row][col] = "target";
      return {...state , boxArray:newBoxArray , state:3}
    default:
      return state
  }
}

function App() {
  const [state , dispatch] = useReducer(gameHandler , initialState); 
  const {boxArray , stage , source , target} = {...state};

  const handleGameButton = () => {
    if(stage===1) alert("Choose Your Source Vertex");
    if(stage===2) alert("Choose Your Target")
    if(stage===3) alert("Enjoy baby")
  }
  const boardButtonClickHandler = (row , col) => {
    if(stage>3) {
      gameStart();
    }
    const payload = {row , col}
    let type = '';
    if(stage===1){
      type = 'makeSource'
    }
    if(stage===2){
      type = 'makeTarget'
    }
    if(stage===3){
      type = 'startTheGame'
    }
    if(stage<=3) dispatch({type , payload})
  }

  const gameStart = async() => {
    let arr = [source];
    while(arr.length){
      const [row , col] =  [...arr[0]];
      arr = arr.splice(0,1);
      if(curr[0] === target[0] && curr[1] === target[1] ){
        return;
      }


      const x = [0 , -1 , 0 , 1];
      const y = [1 , 0 , -1 , 0];
      let i = 0;
      const t = setInterval(()=>{
        const nR = row + x[i];
        const nC = col + y[i];
        if(nR > -1 && nR < 13 && nC > -1 && nC < 30 ){
          arr.push(nR , nC);
          dispatch({action : "changeBoardArray" , payload:[nR , nC]})
        }
      },4*100)

    }
  }

  return (
    <>
      <div className="box-wrapper">
      {
      boxArray.map((row , rowNum) => (
        <div key={rowNum} className='row'  >
        {
          row.map((col , colNum) => (
            <Box key={colNum} type={col} col={colNum} row={rowNum} onClick={boardButtonClickHandler}/>
          ))
        }
        </div>
      ))
      }
      </div>
      <button 
        className='start-button'
        onClick={handleGameButton}
      >
        Click Me
      </button>
    </>
  )
}

export default App;
