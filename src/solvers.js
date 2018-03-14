/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


/**
 * @param {Number} n - Size of nxn chessboard
 * 
 * @description
 * 1. Set the initialth position of a binary number "board" to startBoard + left shift initial
 *      Ex. startBoard = 1, initial = 5 
 *      board = 0000000000000001 + 0000000000100000
 * 2. Calculate first position which can be occupied:
 *    If this value is greater than n ** 2, return the board
 * 3. Add 1 << positon to occupy to board in order to fill the position
 * 4. Recursively call findNRooksSolution with n and board
 *       
 */
window.findNRooksSolution = function(n, startBoard = 1, initial = 0) {
  console.log('start board', startBoard)
  let board = startBoard //+ initial === 0 ? 0 : (1 << initial);
  console.log('initial board', board);
  let binaryString = findBinaryRepresentation(board);
  //Put binary representation of board into binaryString

  console.log('binary representation of board', binaryString);
  //Get index + 1 of every bit in the binaryString, put those into binaryPositions

  const unsafePositions = findUnsafePositions(binaryString, n);
  console.log('unsafe positions', JSON.stringify(unsafePositions));
  //Calculate next available position for rook

  const positionToOccupy = findNextPosition(unsafePositions, n);
  console.log('position to occupy', positionToOccupy)
  if (positionToOccupy === -1) return board;
  board += (1 << (positionToOccupy - 1));
  console.log('board before recursive statement', board);  
  return window.findNRooksSolution(n, board, 0);
};

const findBinaryRepresentation = (number, binaryString = '') => {
  if (number === 0) return '';
  binaryString += '' + (number % 2);
  return findBinaryRepresentation(Math.floor(number/2), binaryString);
}

const findUnsafePositions = (binaryString, n) => {
  let flippedString = binaryString.split("").reverse().join("");
  //Positions with a 1
  const bitPositions = [];
  for (let stringIndexPos = 0; stringIndexPos < flippedString.length; stringIndexPos++) {
    if (flippedString[stringIndexPos] === '1') {
      bitPositions.push(stringIndexPos + 1);
    }
  }
  console.log('bit positions', JSON.stringify(bitPositions));
  //Calculate unsafe positions for each bit in bitPositions, then sort the unsafe positions
  //and remove duplicates
  const unsafePositions = [];
  for (const position of bitPositions) {
    const firstOfRow = Math.floor(position / n) * n + 1;
    for (let count = 0; count < n; count++) {
      unsafePositions.push(firstOfRow + count);
    }
    const firstOfCol = position % n;
    for (let count = 0; count < n; count++) {
      unsafePositions.push(firstOfCol + n * count);
    }
  }

  return unsafePositions.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
  });
}

const findNextPosition = (unsafePositions, n) => {
  let availablePosition = -1;
  let index = 0;
  unsafePositions.forEach((unsafePosition) => {
    //If next available position has not been found
    console.log('unsafe position', unsafePosition)
    if (unsafePosition >= n ** 2) availablePosition = -1;
    if (availablePosition === -1) {
      console.log('avail pos = -1')
      //If the next position equals this position + 1, then the next bit is not safe
      if (unsafePosition + 1 !== unsafePositions[index + 1]) {
        console.log('setting avail pos');
        availablePosition = unsafePosition + 1;
      }
    }
    index++;
  });
  return availablePosition;
}
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
