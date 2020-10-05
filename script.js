const STATE = [ initialState() ];
document.getElementById('board').innerHTML = makeBoard(STATE)

// make event listeners for clicks
document.querySelector('body').addEventListener('click', score)

// @return an interpolated string template literal
function makeBoard(state) {
  const current = getCurrent(state);
  console.log('current: ', current)
  return `<tr> hello <td> ${current[0]} <td> <td> ${current[1]} <td> <td> ${current[2]} <td> </tr>`
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



function isEven(array) {
  return array.length % 2 === 0 ? true : false;
}


function isXNext() {
    return isEven(STATE)
}

function score(evt) {
  console.log('there was a click')
  if ( evt.target.tagName === 'TD') {
    console.log('the click was on a table data cell')
  }
}

// @param squares: string[]
const calculateWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
};