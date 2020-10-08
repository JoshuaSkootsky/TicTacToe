# Tic Tac Toe

Check it out on my blog, [https://joshuaskootsky.com](https://joshuaskootsky.com)

[Part 1 explanation](https://www.joshuaskootsky.com/posts/tic-tac-toe/)

[Part 2 , Tic Tac Toe generalized and memoized](https://www.joshuaskootsky.com/posts/tic-tac-toe-memoized/)

# Win Condition

Originally, this project used a precalculated collection of boxes to check if something was a win or not.

On the `win-condition` branch, I'm trying out a simple way of checking for a win that isn't as hard coded, as part of keeping things generic and being able to make it potentially a larger board or Connect Four.

Specifically, to calculate the winner, this is how I examine the state and return the winning value or false:

```javascript
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
```
Originally I was pretty confused about how to do this. I was thinking of using something like [flood fill](https://en.wikipedia.org/wiki/Flood_fill) or [Quick Fill](https://www.codeproject.com/Articles/6017/QuickFill-An-Efficient-Flood-Fill-Algorithm). This kind of more complicated search algorithm might be good for a different kind of game, but not `n x n` Tic Tac Toe.


One way of doing this is to ask, "If I wasn't given the array of arrays `lines`, how would I calculate it?" The plan being to take the knowledge that I'm dealing with an `n x n` box, and to calculate the indicies of the `n` rows, `n` columns, and two diagonals. This calculation can be done just once, and the result of the calculation can be consulted to check the board if there is a winner.


Okay, so `[[0, 1, 2],[3, 4, 5],[6, 7, 8]]` we can get them by going every `n` steps and adding the next `n` elements to the array.

As in:

```javascript
const N = 3;
const indexedArray = new Array(N*N).fill(0).map((e,i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8]

const horizontalLines = horizontalLineGen(N);
```
```javascript
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
```

and hey, that works!

```javascript
> horizontalLineGen(4)
[
  [ 0, 1, 2, 3 ],
  [ 4, 5, 6, 7 ],
  [ 8, 9, 10, 11 ],
  [ 12, 13, 14, 15 ]
]
```

Okay, let's generate the vertical lines

```javascript
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

> verticalLineGen(3)
[ [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ] ]

> verticalLineGen(4)
[
  [ 0, 4, 8, 12 ],
  [ 1, 5, 9, 13 ],
  [ 2, 6, 10, 14 ],
  [ 3, 7, 11, 15 ]
]
```

Okay that seems about right.

```javascript
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

> diagonalLineGen(3)
[ [ 0, 4, 8 ], [ 2, 4, 6 ] ]

> diagonalLineGen(4)
[ [ 0, 5, 10, 15 ], [ 3, 6, 9, 12 ] ]

```

Okay so now I'll combine those three functions.

```javascript
function lineGen(N) {
  const result = [... diagonalLineGen(N),
                  ... verticalLineGen(N),
                  ... horizontalLineGen(N) ]
  return result;
}

> lineGen(3)
[
  [ 0, 4, 8 ],
  [ 2, 4, 6 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ]
]
```

So, I think I've done it.

TODO: 

function calculateWinner (squares) {

needs to take the lines from lineGen and forEach check to see if any of them all match with an X or an O.

```javascript
const lines = lineGen(3); // let's say N = 3

/* OLD CODE:

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ( (squares[a] === 'X' || squares[a] === 'O') 
          && squares[a] === squares[b] 
          && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
*/

  // rewrite:
  // squares in scope
  let winner = false;
  lines.forEach(line =>  {
    if (line.every(e => squares[e] === 'O')) winner = 'O';
    if (line.every(e => squares[e] ===  'X')) winner = 'X';
  }
  return winner;


```
So the new calculateWinner will depend on three functions, and look like this: 

```javascript
function calculateWinner (squares) {
  const lines = lineGen(Math.sqrt(squares.length));
 
  let winner = false;
  lines.forEach(line =>  {
    if (line.every(e => squares[e] === 'O')) winner = 'O';
    if (line.every(e => squares[e] ===  'X')) winner = 'X';
  });
  return winner;
};
```

This works. However, note something a little interesting - we're recomputing the lines every time we calculate the winner. Since this happens every move, and we aren't changing the size of the board, this isn't necessary. It'd be nice to precompute the lines. I put a console log into lineGen and saw that it was actually calculating the lines twice per move, since the game checks before each move to see if someone has already won, and checks after a move to see if it should display if someone won.

To precompute the lines, one way to do this would be to make line generator aware of previous work that it did. I could memoize my line generator.

```javascript
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
      console.log('Reading memo...');
      return memo[n];
    }
    console.log('recalculating...');
    return memo[n] = cb(n);
  }
}

const lineGen = memoize(unmemolineGen);

>
recalculating...
Reading memo...
Reading memo...
Reading memo...
Reading memo...
Reading memo...
Reading memo...
```
So it works, it isn't repeating work, and it's reading from the memoized cache. Great!