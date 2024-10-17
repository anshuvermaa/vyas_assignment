-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "player1" TEXT NOT NULL,
    "player2" TEXT NOT NULL,
    "steps" INTEGER[],

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
