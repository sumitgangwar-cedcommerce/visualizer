import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./component/Board";

const App = () => {
  const [boxArr, setBoxArr] = useState([]);

  const [source, setSource] = useState([-1, -1]);

  const [target, setTarget] = useState([-1, -1]);

  const [gameOver, setGameOver] = useState(-1);

  const [currQueue, setCurrQueue] = useState([]);

  const visited = useRef(
    Array(Math.floor(window.innerHeight / 50))
      .fill(0)
      .map(
        (item) =>
          (item = Array(Math.floor(window.innerWidth / 50)).fill([false , [-1 , -1]]))
      )
  );


  const boardButtonClickHandler = (row, col) => {
    if (source[0] === -1) {
      boxArr[row][col] = "source";
      setBoxArr(boxArr);
      setSource([row, col]);
    } else if (target[0] === -1) {
      boxArr[row][col] = "target";
      setBoxArr(boxArr);
      setTarget([row, col]);
    } else {
      setGameOver(0)
      changeBoard();
    }
  };

  const changeBoard = () => {
    let [cR, cC] = [...currQueue[0]];
    // let [cR , cC] = [...currQueue[currQueue.length -1]];
    let newQueue = [...currQueue];
    boxArr[cR][cC] = "fill";
    newQueue.splice(0 , 1)
    // newQueue.splice(currQueue.length -1, 1);

    if (target[0] === cR && target[1] === cC) {
      alert("Target Match");
      makePath([cR , cC])
      return;
    }
    const x = [0, -1, -1, -1, 0, 1, 1, 1];
    const y = [1, 1, 0, -1, -1, -1, 0, 1];

    for (let i = 0; i < 8; i++) {
      const nR = cR + x[i];
      const nC = cC + y[i];
      if (
        nR > -1 &&
        nC > -1 &&
        nR < Math.floor(window.innerHeight / 50) &&
        nC < Math.floor(window.innerWidth / 50) &&
        !visited.current[nR][nC][0]
      ) {
        visited.current[nR][nC] = [true , [cR , cC]]
        newQueue.push([nR, nC]);
      }
    }

    setTimeout(() => {
      setCurrQueue([...newQueue]);
      setBoxArr([...boxArr]);
    }, 8);
  };

  const makePath = (coordinate) => {
    boxArr[coordinate[0]][coordinate[1]] = 'path'
    setBoxArr([...boxArr])

    if(coordinate[0] === source[0] && coordinate[1] === source[1]){
      setGameOver(-1)
      return
    }
    else {
      setTimeout(()=>{
        makePath(visited.current[coordinate[0]][coordinate[1]][1])
      },100)
    }    
  }

  useEffect(() => {
    setBoxArr(
      Array(Math.floor(window.innerHeight / 50))
        .fill(0)
        .map(
          (item) =>
            (item = Array(Math.floor(window.innerWidth / 50)).fill("simple"))
        )
    );
  }, []);

  useEffect(() => {
    if (target[0] !== -1)
      setCurrQueue((prev) => [...prev, source]);
  }, [target]);

  useEffect(() => {
    if(gameOver === -1)  return

    if (currQueue.length && gameOver === 0) {
      changeBoard();
    }
    else if(gameOver !== 0){
      console.log('first')
      makePath(gameOver)
    }
  }, [currQueue, gameOver]);

  return (
    <>
      <Board board={boxArr} onClick={boardButtonClickHandler} />
    </>
  );
};

export default App;
