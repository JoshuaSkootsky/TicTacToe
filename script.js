// keep game state and game logic seperate from HTML representation
const STATE = [ initialState() ];
let won = false;
makeBoard(STATE);

// make event listeners for clicks
document.querySelector('body').addEventListener('click', clickOnBox)

// this is the representation, with HTML, of the game state
// @param state an array of arrays of the board states : string[][]
// @return an interpolated string template literal
function makeBoard(state) {
  const current = getCurrent(state);

  const board = `<div class="parent">
  <h2>Tic-Tac-Toe</h2>
  <div class="children">
    <div id="box_0" class="box">${current[0]}</div>
    <div id="box_1" class="box">${current[1]}</div>
    <div id="box_2" class="box">${current[2]}</div>
    <div id="box_3" class="box">${current[3]}</div>
    <div id="box_4" class="box">${current[4]}</div>
    <div id="box_5" class="box">${current[5]}</div>
    <div id="box_6" class="box">${current[6]}</div>
    <div id="box_7" class="box">${current[7]}</div>
    <div id="box_8" class="box">${current[8]}</div>
  </div>
</div>`
  document.getElementById('board').innerHTML = board;
}
// everything can be derived from this state
function getCurrent(state) {
  const current = state[state.length - 1];
  return current;
}

function initialState() {
	// make an empty tic tac toe board
	const board = [];
	for (let i = 0; i < 9; i++) {
	  board.push(' ');
	}
	return board;
}

function isXNext(state) {
    return state.length % 2 === 0;
}

function clickOnBox(evt) {
 
  if ( evt.target.className === 'box' && won !== true) {
    // figure out which box was clicked
    const id = parseInt(evt.target.id.slice(4))
    
    // read from game logic to know if move is valid
    const board = getCurrent(STATE);
    if (board[id] === ' ') {
      // add next legal move to game logic and to HTML
      const next = isXNext(STATE) ? 'X' : 'O';
      const nextBoard = [... board];
      nextBoard[id] = next;
      STATE.push(nextBoard);
      document.getElementById(evt.target.id).innerText = next;

      score(nextBoard);
    }

  }
}

// @param squares: string[]
function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ( (squares[a] === 'X' || squares[a] === 'O') 
          && squares[a] === squares[b] 
          && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
};

function score(board) {
  const winner = calculateWinner(board);
  if (winner === 'X' || winner === 'O') {
    // prevent further clicks
    document.querySelector('h2').innerText = `${winner} is the winner!`
    won = true;
  }
}

function takeBack(STATE) {
  if(STATE.length > 1) STATE.pop();
  won = calculateWinner(getCurrent(STATE)) ? true : false;
  makeBoard(STATE);
}