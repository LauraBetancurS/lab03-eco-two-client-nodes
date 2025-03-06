const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

let users = [];
let countdown = 10;
let gameTimeout = null;

function calculateWinner(player1, player2) {
  if (player1.move === player2.move) {
    return "It's a tie!";
  }

  if (
    (player1.move === "rock" && player2.move === "scissors") ||
    (player1.move === "paper" && player2.move === "rock") ||
    (player1.move === "scissors" && player2.move === "paper")
  ) {
    return `${player1.name} wins!`;
  } else {
    return `${player2.name} wins!`;
  }
}

function clearGameSession() {
  users = [];
  countdown = 10;
  console.log("Game reset. Waiting for new players.");
}

app.get("/users", (req, res) => {
  console.log("Current users:", users);
  console.log("Current countdown:", countdown);

  let result = null;
  if (users.length === 2) {
    result = calculateWinner(users[0], users[1]);
  }

  res.status(200).json({ users, countdown, result });
});

app.post("/users", (req, res) => {
  const user = req.body;

  if (users.length >= 2) {
    return res.status(400).json({ message: "Only 2 players allowed." });
  }

  users.push(user);

  if (users.length === 1) {
    gameTimeout = setInterval(() => {
      countdown--;

      if (countdown <= 0) {
        clearInterval(gameTimeout);
        clearGameSession();
      }
    }, 1000);
  }

  if (users.length === 2) {
    clearInterval(gameTimeout);
    setTimeout(clearGameSession, 10000);
  }

  res.status(201).json(user);
});

app.listen(5050, () => {
  console.log("Server is running on http://localhost:5050");
});
