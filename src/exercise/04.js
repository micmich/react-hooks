// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import useLocalStorage from './useSth.js'

function Board() {

  const [squares, setSquares] = useLocalStorage({ storageName: 'ticTacToe', initialValue: [Array(9).fill(null)]});
  const [index, setIndex] = useLocalStorage({ storageName: 'ticTacToeIdx', initialValue: 0 });

  // // 🐨 squares is the state for this component. Add useState for squares
  // const [squares, setSquares] = React.useState(() => { 
  //   const stored = window.localStorage.getItem('ticTacToe');
  //   return (stored ? JSON.parse(stored) : null) ?? Array(9).fill(null);
  // });

  // React.useEffect(() => {
  //   window.localStorage.setItem('ticTacToe', JSON.stringify(squares));
  // }, [squares]);

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  function currSQ() {
    return squares[index]
  }

  function atEnd() {
    return index === (squares.length - 1);
  }

  function atFirst() {
    return index === 0;
  }

  function gotoPrevIdx() {
    setIndex((idx) => idx -1 )
  }

  function gotoNextIdx() {
    setIndex((idx) => {
      if (idx + 1 < squares.length) {
        return idx + 1;
      }
      return idx;
    })
  }

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already a winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy

    if (!currSQ()[square] && !calculateWinner(currSQ())) {

      let history = [...squares];
      if (!atEnd()) {
        history = history.slice(0, index + 1);
      }
      
      let altered = [...currSQ()];
      altered[square] = calculateNextValue(altered);
      setSquares([...history, altered]);
      setIndex((idx) => idx + 1)
    }

  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setSquares([Array(9).fill(null)]);
    setIndex(0);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {currSQ()[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">STATUS {calculateStatus(calculateWinner(currSQ()), currSQ(), calculateNextValue(currSQ()))} </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <div style={{marginTop: '3px'}} >
        <button disabled={atFirst()} onClick={gotoPrevIdx}>&lt;</button>
        <button disabled={atEnd()} onClick={gotoNextIdx}>&gt;</button>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
