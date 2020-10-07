# Tic Tac Toe

Check it out on my blog, [https://joshuaskootsky.com](https://joshuaskootsky.com)

[Part 1 explanation](https://www.joshuaskootsky.com/posts/tic-tac-toe/)

[Part 2 coming soon!]

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

Okay, let's generate the 