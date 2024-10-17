"use client";

import React, { useEffect, useState } from "react";
import PlayerForm from "../components/PlayerForm";
import GameBoard from "../components/GameBoard";
import GameList from "../components/GameList";
import { useGameMutations } from "../hooks/useGameMutations";

const App = () => {
  const [loadedGame, setLoadedGame] = useState(null);

  const { saveGame, updateGame } = useGameMutations();

  const handleSave = (gameData, isUpdate = false) => {
    if (isUpdate) {
      console.log("id", gameData);
      updateGame.mutate({ id: gameData.id, updatedGame: gameData });
    } else {
      saveGame.mutate(gameData);
    }
  };

  const handleSelectGame = (gameData) => {
    setLoadedGame(gameData);
    console.log("new game", gameData);
  };

  const handleSubmit = (players) => {
    handleSave({
      player1: players.player1,
      player2: players.player2,
      moves: Array(9).fill(null),
      winner: null,
    });
  };

  useEffect(() => {
    const game = JSON.parse(localStorage.getItem("currentGame"));
    setLoadedGame(game);
    console.log("first", game);
  }, [saveGame.data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-6">Tic Tac Toe</h1>

      {!loadedGame && <PlayerForm onSubmit={handleSubmit} />}

      {loadedGame && (
        <GameBoard
          onSave={handleSave}
          initialGame={loadedGame}
          newGame={setLoadedGame}
        />
      )}

      <GameList onSelect={handleSelectGame} />
    </div>
  );
};

export default App;
