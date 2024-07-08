// Huidige speler (begint met 'X')
let currentPlayer = 'X';                             
// gewoon de size 3 bij
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
// Is het spel actief?
let gameActive = true;

// Functie om de beurt van de speler te verwerken
function handlePlayerTurn(clickedCellIndex) {
// Controleer of de cel al bezet is of het spel niet actief is
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
   // Zet de huidige speler in de geselecteerde cel
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});
// Functie om het spelbord bij te werken op het scherm
function updateUI() {
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameBoard[i];
  }
}

function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'Game Draw!';
}

const winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Left-to-right diagonal
  [2, 4, 6]  // Right-to-left diagonal
];
// Controleer op winst of gelijkspel
function checkForWinOrDraw() {
  let roundWon = false;
  //functie loopt door een reeks vooraf gedefinieerde winnende combinaties (zoals rijen, kolommen en diagonalen) op het spelbord
  for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          roundWon = true;
          break;
      }
  }
  //Als een winnende combinatie wordt gevonden, wordt de boolean roundWon ingesteld op true

  if (roundWon) {
      announceWinner(currentPlayer);
   //Het spel wordt beëindigd door gameActive op false te zetten.
      gameActive = false;
      return;
  }
  //Als er geen winnaar is, controleert de functie of er nog lege cellen op het bord zijn
  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
      announceDraw();
      gameActive = false;
      return;
  }
}

function resetGame()
// Reset het spelbord en de huidige speler 
{
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  // Wis de tekst in alle cellen op het scherm
  cells.forEach(cell => {
      cell.innerText = '';
  });
  // Wis ook het bericht over winst of gelijkspel
  document.getElementById('gameMessage').innerText = '';
}
//Hiermee wordt het HTML-element met de ID “resetButton” opgehaald en opgeslagen in de constante variabele resetButton
const resetButton = document.getElementById('resetButton');
//De event listener is geconfigureerd om te reageren op een muisklik (het ‘click’-event)
//Wanneer de gebruiker op de knop klikt, wordt de functie resetGame uitgevoerd.
resetButton.addEventListener('click', resetGame, false);