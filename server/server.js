import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(games);
});

app.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  const game = await prisma.game.findUnique({
    where: { id: parseInt(id) },
  });
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
});

app.post('/games', async (req, res) => {
  const { player1, player2, moves, winner } = req.body;
  const game = await prisma.game.create({
    data: {
      player1,
      player2,
      moves: JSON.stringify(moves),
      winner,
    },
  });
  res.json(game);
});

app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { moves, winner } = req.body;
  try {
    const updatedGame = await prisma.game.update({
      where: { id: parseInt(id) },
      data: {
        moves: JSON.stringify(moves),
        winner,
      },
    });
    res.json(updatedGame);
  } catch (error) {
    res.status(404).json({ error: 'Game not found' });
  }
});

// Delete a game
app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.game.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Game not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
