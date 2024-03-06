import "./App.css"
import Board from "./components/Board";
import React, {useState} from "react";

function App() {

  const [history, sethistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setxIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0);
  const calulateWinner = (squares) => {

    const lines =[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a,b,c] = lines[index];
      if(squares[a] && squares[a] === squares[b] && squares[a] ===squares[c]  ){
        return squares[a];
        }
      } 
      return null;
    }
  const current = history[stepNumber];
  const winner = calulateWinner(current.squares);
  
  let status;
  if(winner){
    status = `Winner is ${winner}`;
  }else{
    status = `Next player ${xIsNext? 'X' : 'O'}`;
  }
  const handleClick =(i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
  
    if(calulateWinner(newSquares)|| newSquares[i]){
      return;
    }
  
    newSquares[i]= xIsNext? 'X' : 'O';
    sethistory([...newHistory, {squares: newSquares}]);
    setxIsNext(prev=>!prev);
    setStepNumber(newHistory.length);
  }
  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext((step%2)===0 );
 
  }
  const moves = history.map((step, move) => {
  const desc =move ?
  'Go to move #' + move : 
  'Go to game start';
  return (
    <li key={move}>
      <button className="move-button"  onClick={()=>jumpTo(move)}>{desc}</button>
    </li>
  )
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i)=>handleClick(i)}/>
      </div>
      <div className="game-info">
      <div className='status'>{status}</div>
      <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
