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
  const lines = lineGen(Math.sqrt(squares.length));
 
  let winner = false;
  lines.forEach(line =>  {
    if (line.every(e => squares[e] === 'O')) winner = 'O';
    if (line.every(e => squares[e] ===  'X')) winner = 'X';
  });
  return winner;
};

function score(board) {
  const winner = calculateWinner(board);
  if (winner === 'X' || winner === 'O') {
    // display the winner
    document.querySelector('h2').innerText = `${winner} is the winner!`
  }
}

function takeBack(STATE) {
  if(STATE.length > 1) STATE.pop();
  makeBoard(STATE);
}

function horizontalLineGen(N) {
  const result = [];
  for (let i = 0; i < N * N; i += N) {
    const line = [];
    for (let j = i; j < i + N; j++) {
      const idx = j; // or indexedArray[j];
      line.push(idx);
    }
    result.push(line);
  }
  return result;
}

function verticalLineGen(N) {
  const result = [];
  for (let i = 0; i < N; i++) {
    const line = [];
    for (let j = i; j < N * N; j += N) {
      line.push(j);
    }
    result.push(line);
  }
  return result;
}

function diagonalLineGen(N) {
  const result = [];
  // make left to right diagonal
  const left = []
  for (let i = 0; i < N * N; i += 1 + N) {
    left.push(i);
  }
  // make right to left diagonal
  const right = [];
  for (let i = N - 1; i < N * N - 1; i += N - 1) {
    right.push(i);
  }
  result.push(left, right);
  return result;
}

function unmemolineGen(N) {
  const result = [... diagonalLineGen(N),
                  ... verticalLineGen(N),
                  ... horizontalLineGen(N) ]
  return result;
}

function memoize(cb) {
  const memo = {};
  return function memoized(n) {
    if (memo[n] !== undefined) {
      return memo[n];
    }
    else {
    } return memo[n] = cb(n);
  }
}

const lineGen = memoize(unmemolineGen);
