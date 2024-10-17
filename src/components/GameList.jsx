"use client"


import React from 'react';
import { useGames } from '../hooks/useGames';
import Button from './button.jsx';

const GameList = ({ onSelect }) => {
  const { data, isLoading, error } = useGames();

  if (isLoading) return <div>Loading games...</div>;
  if (error) return <div>Error loading games.</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Previous Games</h2>
      {data.length === 0 ? (
        <div>No games saved yet.</div>
      ) : (
        <ul className="space-y-4">
          {data.map(game => (
            <li key={game.id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <div><strong>Game ID:</strong> {game.id}</div>
                <div><strong>Player 1 (X):</strong> {game.player1}</div>
                <div><strong>Player 2 (O):</strong> {game.player2}</div>
                <div><strong>Winner:</strong> {game.winner || 'Draw'}</div>
                <div><strong>Moves:</strong> {JSON.parse(game.moves).join(', ')}</div>
                <div><strong>Created At:</strong> {new Date(game.createdAt).toLocaleString()}</div>
              </div>
              <Button handleClick={() => onSelect(game)} className={"px-4 py-2 bg-purple-500 text-white"}>Replay</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
