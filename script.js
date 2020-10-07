// keep game state and game logic seperate from HTML representation
const STATE = initialState();
makeBoard(STATE);

function reset(state) {
  while (state.length > 1) {
    state.pop();
  }
  makeBoard(state);
}

// make event listeners for clicks
document.querySelector('body').addEventListener('click', clickOnBox)


// this is the representation, with HTML, of the game state
// @param state an array of arrays of the board states : string[][]
// @return an interpolated string template literal
function makeBoard(state) {
  const currentState = getCurrent(state);

  const board = `<div class="parent">
  <h2>Tic-Tac-Toe</h2>
  <div class="children">
    ${boxesHTMLMaker(currentState)}
  </div>
</div>`

  document.getElementById('board').innerHTML = board;
}

function boxMaker(value, id) {
  return `<div id="box_${id}" class="box"> ${value} </div>`
}

function boxesHTMLMaker(array) {
  const boxesHTML = array.map((value, id) => boxMaker(value, id)).join('');
  return boxesHTML;
}

// everything can be derived from this state
function getCurrent(state) {
  const current = state[state.length - 1];
  return current;
}

	// make an empty tic tac toe board
function initialState() {
  // board size = n * n;
  const SIZE = 3 * 3;
	const board = [];
	for (let i = 0; i < SIZE; i++) {
	  board.push(' ');
	}
	return [ board ];
}

// state.length === 1 // true => X is next
function isXNext(state) {
    return state.length % 2 === 1;
}

function clickOnBox(evt) {
 
  if ( evt.target.className === 'box' && 
   calculateWinner(getCurrent(STATE)) === false) {
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

// for n x n the hard coded __ needs to go
// could do a kind of fancy search
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
  }
}

function takeBack(STATE) {
  if(STATE.length > 1) STATE.pop();
  makeBoard(STATE);
}