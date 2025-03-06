// Selecting elements where the game status, player choices, and results will be displayed
const gameStatus = document.getElementById("game-status");
const playerChoices = document.getElementById("player-choices");
const gameResult = document.getElementById("game-result");

// Function to check the game status and update the display
function updateGameStatus() {
  // Request the current game status from the server
  fetch("http://localhost:5050/users")
    .then((response) => response.json()) // Convert the server's response into JSON format
    .then((data) => {
      console.log("Server response:", data); // Log the received data for debugging

      // If there is an issue with the server response, log an error and stop
      if (!data.users) {
        console.error("Error: 'users' is undefined in the response.");
        return;
      }

      // Extract users (players), countdown timer, and game result from the response
      const { users, countdown, result } = data;

      // If only one player has joined, show a waiting message
      if (users.length === 1) {
        gameStatus.innerHTML = `<p> Waiting for your opponent... ${countdown} seconds remaining.</p>`;
        gameResult.innerHTML = ""; // Clear previous results
      } 
      // If two players have joined, display their choices
      else if (users.length === 2) {
        gameStatus.innerHTML = ""; // Clear the waiting message

        // Create HTML content for each player's choice
        playerChoices.innerHTML = users
          .map(
            (user, index) => 
              `<p>Player ${index + 1}: ${user.name} chose ${user.move}</p>`
          ) 
          .join(""); // Combine the generated HTML into a single string

        /**
         * 🔹 .map():
         * - The `.map()` function loops through the `users` array.
         * - For each user, it creates a string of HTML that displays the player's name and choice.
         * - `index + 1` is used to show "Player 1" and "Player 2".
         *
         * 🔹 .join(""):
         * - `.join("")` merges all the generated HTML strings into **one single string**.
         * - Without `.join()`, the result would be an **array of HTML strings**, which wouldn't display correctly.
         */

        // If the game has a result, display it
        if (result) {
          gameResult.innerHTML = `<h2>${result}</h2>`;
        }
      } 
      // If no players have joined, prompt for players to enter
      else {
        gameStatus.innerHTML = "<p> Awaiting challengers...</p>";
        playerChoices.innerHTML = "";
        gameResult.innerHTML = "";
      }
    })
    // Handle any errors that occur while fetching data from the server
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Automatically update the game status every second
setInterval(updateGameStatus, 1000);
