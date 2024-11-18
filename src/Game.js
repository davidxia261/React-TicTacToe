import React, { useState, useEffect } from "react";
import GameGrid from "./GameGrid.js";
// TODO: Import useState() hook

function Game() {
   // TODO: Replace variables with state variables
   const [moves, setMoves] = useState(new Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   const [winner, setWinner] = useState(null);
   const [currentMove, setCurrentMove] = useState(null);
  
   function gridClick(whichSquare) {
      // TODO: Replace with code to set the move and turn
      if (!winner && turn === "X" && moves[whichSquare] === "") {
         setCurrentMove(whichSquare);
      } else {
         console.log("this square is filled");
      }
   }

   useEffect(() => {
      if (currentMove !== null) {
         const newMoves = [...moves];
         newMoves[currentMove] = "X";
         setMoves(newMoves); 
         checkWinner(newMoves); 
         setTurn("O"); 
      }
   }, [currentMove]);


   // TODO: Add newGame() function here
   function newGame() {
      setMoves(new Array(9).fill(""));
      setTurn("X");
      setWinner(null);
   }

   function checkWinner(moves) {
      const winningCombinations = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8], 
         [0, 3, 6], 
         [1, 4, 7], 
         [2, 5, 8], 
         [0, 4, 8], 
         [2, 4, 6], 
      ];
   
      for (const combination of winningCombinations) {
         const [a, b, c] = combination;
         if (
            moves[a] !== "" && 
            moves[a] === moves[b] && 
            moves[a] === moves[c]
         ) {
            setWinner(moves[a]);
         }
      }
   }

   function computerMove() {
      const availableSquares = moves
         .map((move, index) => (move === "" ? index : null))
         .filter((index) => index !== null);

      if (availableSquares.length > 0) {
         const randomIndex =
            availableSquares[Math.floor(Math.random() * availableSquares.length)];

         const newMoves = [...moves];
         newMoves[randomIndex] = "O";
         setMoves(newMoves);

         checkWinner(newMoves);
         setTurn("X");
      }
   }

   useEffect(() => {
      if (winner) {
         alert(`${winner} wins!`);
      }
   }, [winner]); 

   useEffect(() => {
      if (turn === "O" && !winner) {
         setTimeout(computerMove, 500);
      }
   }, [turn, winner]);

   // TODO: Make New Game button to call newGame() when clicked
   return (
      <>
         <h1>Tic-Tac-Toe</h1>        
         <GameGrid moves={moves} click={gridClick} />
         <p>
            Turn: <strong className={turn}>{turn}</strong>
         </p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;