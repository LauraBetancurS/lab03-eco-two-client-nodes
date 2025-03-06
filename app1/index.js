// Function to fetch the list of players from the server
function fetchPlayers() {
  fetch("http://localhost:5050/users") // Send a GET request to the server
    .then((response) => response.json()) // Convert the response to JSON format
    .then((data) => console.log("get response", data)) // Log the data received from the server
    .catch((error) => console.error("Error:", error)); // Handle any errors
}

// Function to submit the player's name and move to the server
const submitPlayer = () => {
  // Get the player's name from the input field
  const playerName = document.getElementById("playerNameInput").value;

  // Get the selected move (rock, paper, or scissors)
  const selectedMove = document.querySelector('input[type="radio"]:checked');

  // If no move is selected, show an alert and stop execution
  if (!selectedMove) {
    alert("Please select a move");
    return;
  }

  // Get the value of the selected move (rock, paper, or scissors)
  const move = selectedMove.value;

  // Create an object containing the player's name and move
  const user = {
    name: playerName,
    move: move,
  };

  // Send the player's data to the server using a POST request
  fetch("http://localhost:5050/users", {
    method: "POST", // Specify that this is a POST request (to send data)
    headers: {
      "Content-Type": "application/json", // Specify that we're sending JSON data
    },
    body: JSON.stringify(user), // Convert the user object to JSON format
  })
    .then((response) => response.json()) // Convert the response to JSON
    .then((data) => console.log("post response", data)) // Log the server's response
    .catch((error) => console.error("Error:", error)); // Handle any errors
};

// Add a click event listener to the submit button
document.getElementById("submit-button").addEventListener("click", submitPlayer, fetchPlayers);
