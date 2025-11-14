const form = document.getElementById("playerForm");
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const tableBody = document.querySelector("#leaderboard tbody");

const API_URL = "http://localhost:3000/players";

// Load players from backend
async function loadPlayers() {
  const res = await fetch(API_URL);
  const players = await res.json();
  displayPlayers(players);
}

// Display players in table
function displayPlayers(players) {
  tableBody.innerHTML = players
    .map(
      (player, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${player.player_name}</td>
      <td><input type="number" id="score-${player.id}" value="${player.score}"/></td>
      <td>
        <button onclick="updatePlayer(${player.id})">Update</button>
        <button onclick="deletePlayer(${player.id})" style="background-color:red;">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
}

// Add or update a player
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value);

  if (!name || isNaN(score)) {
    alert("Enter valid name and score");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score }),
  });

  nameInput.value = "";
  scoreInput.value = "";
  loadPlayers();
});

// Update score
async function updatePlayer(id) {
  const newScore = document.getElementById(`score-${id}`).value;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score: parseInt(newScore) }),
  });

  loadPlayers();
}

// Delete player
async function deletePlayer(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadPlayers();
}

loadPlayers();

