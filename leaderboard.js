const form = document.getElementById('playerForm');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const tableBody = document.querySelector('#leaderboard tbody');


let players = JSON.parse(localStorage.getItem('players')) || [];

// Display players in table
function displayPlayers() {
  
  players.sort((a, b) => b.score - a.score);

  tableBody.innerHTML = players.map((player, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${player.name}</td>
      <td><input type="number" id="score-${index}" value="${player.score}" /></td>
      <td>
        <button onclick="updatePlayer(${index})">Update</button>
        <button onclick="deletePlayer(${index})" style="background-color:red;">Delete</button>
      </td>
    </tr>
  `).join('');

  
  localStorage.setItem('players', JSON.stringify(players));
}

// Add or update a player
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value);

  if (!name || isNaN(score)) return alert('Please enter valid name and score.');

  // Check if player already exists
  const existing = players.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.score = score; // update score
  } else {
    players.push({ name, score });
  }

  nameInput.value = '';
  scoreInput.value = '';
  displayPlayers();
});

// Update score directly in table
function updatePlayer(index) {
  const newScore = parseInt(document.getElementById(`score-${index}`).value);
  if (isNaN(newScore)) return alert('Invalid score');
  players[index].score = newScore;
  displayPlayers();
}

// Delete player
function deletePlayer(index) {
  players.splice(index, 1);
  displayPlayers();
}

// Load leaderboard on page start
displayPlayers();
