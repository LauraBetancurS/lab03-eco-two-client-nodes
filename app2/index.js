const gameStatus = document.getElementById("game-status");
const playerChoices = document.getElementById("player-choices");
const gameResult = document.getElementById("game-result");

function updateGameStatus() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);

      if (!data.users) {
        console.error("Error: 'users' is undefined in the response.");
        return;
      }

      const { users, countdown, result } = data;

      if (users.length === 1) {
        gameStatus.innerHTML = `<p>💃 Waiting for your  opponent... ${countdown} seconds remaining.</p>`;
        gameResult.innerHTML = "";
      } else if (users.length === 2) {
        gameStatus.innerHTML = "";

        playerChoices.innerHTML = users
          .map(
            (user, index) =>
              `<p>Player ${index + 1}: ${user.name} chose ${user.move}</p>`
          )
          .join("");

        if (result) {
          gameResult.innerHTML = `<h2>${result}</h2>`;
        }
      } else {
        gameStatus.innerHTML = "<p> Awaiting  challengers...</p>";
        playerChoices.innerHTML = "";
        gameResult.innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

setInterval(updateGameStatus, 1000);
