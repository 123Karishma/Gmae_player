import React, { useState } from 'react'
import './Players.css'
import { Button, Paper } from '@mui/material';


function Square({ value, onsquareClick }) {
  return <button className={`square ${value === "X" ? "x" : "o"}`} onClick={onsquareClick}>{value}</button>;

}

const Players = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [tie, setTie] = useState(0)

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';

    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext)

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "player  " + winner + "   Win!  ," ;
  }
  else {
    status = " player   " + (xIsNext ? "X" : "O") + "   turn ,";
    if (winner && winner !== "X" && winner !== "O"){
      status ="its a drow "
    }
  }


  function calculateWinner( squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleRestart = () => {
    setSquares(true)
    setSquares(Array(9).fill(null))
    setTie(tie + 1)

  }

  let filled = true
  if (filled && winner !== "X" && winner !== "O") {
    filled = true;
  }
return (
    <div className='mybody'  >
      <div className='header'>
        <h1>Tic Tac Toe Game</h1>
      </div>
      <div className="status">{status}
        <span> Tie  {tie}</span></div>
      <Paper className='paperbody' sx={{ background: "none", }}>
        <div className='border-raw'>
          <Square value={squares[0]} onsquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onsquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onsquareClick={() => handleClick(2)} />
        </div>
        <div className='border-raw'>
          <Square value={squares[3]} onsquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onsquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onsquareClick={() => handleClick(5)} />
        </div>
        <div className='border-raw'>
          <Square value={squares[6]} onsquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onsquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onsquareClick={() => handleClick(8)} />
        </div>
        <Button className="restart" variant="contained" sx={{ marginTop: 2, marginLeft: 10 }} onClick={handleRestart}>Restart Game!</Button >
      </Paper>
    </div>
 )
}

export default Players