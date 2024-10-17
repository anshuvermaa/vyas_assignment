"use client"

import React, { useState, useEffect } from 'react';
import { calculateWinner } from '../utils/gameUtils.js';
import Button from './button.jsx'
import { useQueryClient } from '@tanstack/react-query';

const GameBoard = ({ onSave, initialGame,newGame }) => {
  const queryClient=useQueryClient()
  const [board, setBoard] = useState(initialGame ? JSON.parse(initialGame.moves) : Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(initialGame ? initialGame.winner : null);


  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      onSave({
        id:initialGame.id,
        moves: board,
        winner: win,
      },true);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      onSave({
        id:initialGame.id,
        moves: board,
        winner: null,
      },true);
    }
  }, [board]);

  const handleSave = () => {
   onSave({
      id:initialGame.id,
      moves: board,
      winner: winner === 'Draw' ? null : winner,
    },true);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  useEffect(()=>{
   setBoard(JSON.parse(initialGame.moves))
   setWinner(initialGame.winner)
  },[initialGame])

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl mb-4">Game Id : {initialGame.id}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <div
            key={idx}
            className={`w-20 h-20 flex items-center justify-center bg-gray-200 cursor-pointer text-2xl
              ${cell === 'X' ? 'text-blue-500' : cell === 'O' ? 'text-red-500' : ''}`}
            onClick={() => handleClick(idx)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-green-500 text-xl">
          {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner === 'X' ? (initialGame.player1 || 'Player X') : (initialGame.player2 || 'Player O')}`}
        </div>
      )}
      <div className="mt-4 space-x-2">
          <>
            <Button
              className={`px-4 py-2 bg-blue-500 text-white rounded`}
              handleClick={()=>{
                handleSave()
                queryClient.invalidateQueries('games')
              }}
            >
              Save Game
            </Button>
            <Button className={""} handleClick={handleReset}> Reset Game</Button>
            <Button className={"bg-green-700"} handleClick={()=> newGame(null)}>new Game</Button>

          </>
      </div>
    </div>
  );
};

export default GameBoard;
