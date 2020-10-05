const STATE = [ initialState() ];
document.getElementById('board').innerHTML = makeBoard(STATE)

// make event listeners for clicks
document.querySelector('body').addEventListener('click', score)

// everything can be derived from this state

// generate the board from a board state
// board state can be an array [[,,][,,],[,,]]
function makeBoard(state) {
  const current = state[state.length - 1];
  
}

function initialState() {
	// make an empty tic tac toe board
	const board = [];
	for (let i = 0; i < 3; i++) {
	  const row = [];
	  for (let j = 0; j < 3; j++) {
	    row.push(' ');
	  }
	  board.push(row);
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




// make a tic tac toe board 
function makeRow() {
    const boxes = document.createElement('tr');
    for (let i = 0; i < 3; i++) {
        const box = document.createElement('td')
        boxes.appendChild(box);
    }

    let result = boxes;

    console.log(result);
    return result;
}
  


const game = makeGame();

function makeGame() {
  // some state here
  const steps = [];

  function isXNext() {
    return steps.length % 2 === 0 ? true : false;
  }

  function score(i) {makeRow(board);

function makeRow(table) {
    const boxes = document.createElement('tr');
    for (let i = 0; i < len; i++) {
        const box = document.createElement('td')
        boxes.appendChild(box);
    }
    table.appendChild(boxes);
}
    const next = isXNext() ? 'X' : 'O';
    const board = [... steps[steps.length - 1]];
    board[i] = next;
    steps.push(board);
  }

  // assign methods
  steps.isXNext = isXNext;
  steps.score = score;

  return Object.freeze(steps);

}