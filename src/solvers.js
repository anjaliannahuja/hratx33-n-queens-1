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
window.findNRooksSolution = function(n, prevBinaryBoard = '', initialBit = 0) {
  if (prevBinaryBoard === '') {
    for (let index = 0; index < Math.pow(n, 2); index++) {
      if (index === initialBit) {
        prevBinaryBoard = '1' + prevBinaryBoard;
      } else {
        prevBinaryBoard = '0' + prevBinaryBoard;
      }
    }
  }

  //Get index + 1 of every bit in the binaryString, put those into binaryPositions
  const unsafePositions = findUnsafePositions(prevBinaryBoard, n);
  //Calculate next available position for rook
  const positionToOccupy = findNextPosition(unsafePositions, n);
  if (positionToOccupy === -1) {
    return prevBinaryBoard;
  }
  const indexToModify = prevBinaryBoard.length - positionToOccupy;
  const newBoard = prevBinaryBoard.substring(0, indexToModify) + '1' + prevBinaryBoard.substring(indexToModify + 1);
  return window.findNRooksSolution(n, newBoard);
};

const getBitPositions = binaryString => {
  let flippedString = binaryString.split('').reverse().join('');
  //Positions with a 1
  const bitPositions = [];
  for (let stringIndexPos = 0; stringIndexPos < flippedString.length; stringIndexPos++) {
    if (flippedString[stringIndexPos] === '1') {
      bitPositions.push(stringIndexPos + 1);
    }
  }
  return bitPositions;
};

const findUnsafePositions = (binaryString, n) => {


  //Calculate unsafe positions for each bit in bitPositions, then sort the unsafe positions
  //and remove duplicates
  const bitPositions = getBitPositions(binarySearch);
  const unsafePositions = [];
  for (const position of bitPositions) {
    const firstOfRow = position % n === 0 ? (Math.floor(position / n) - 1) * n + 1 : Math.floor(position / n) * n + 1;
    for (let count = 0; count < n; count++) {
      unsafePositions.push(firstOfRow + count);
    }
    let firstOfCol = position;    
    while (firstOfCol - n > 0) {
      firstOfCol -= n;
    }
    for (let count = 0; count < n; count++) {
      unsafePositions.push(firstOfCol + n * count);
    }
  }
  return unsafePositions.sort((a, b) => a - b).filter(function(item, pos, ary) {
    return !(item === ary[pos - 1]);
  });
};

const findNextPosition = (unsafePositions, n) => {
  let availablePosition = -1;
  let index = 0;
  if (unsafePositions.length === Math.pow(n, 2)) {
    return availablePosition;
  }
  unsafePositions.forEach((unsafePosition) => {
    //If next available position has not been found
    if (availablePosition === -1) {
      //If the next position equals this position + 1, then the next bit is not safe
      if (unsafePosition + 1 !== unsafePositions[index + 1]) {
        availablePosition = unsafePosition + 1;
      }
    }
    index++;
  });
  return availablePosition;
};
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  for (let count = 0; count < n; count++) {
    console.log(window.findNRooksSolution(n, '', count));
    solutionCount += 1;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

const calculateDiagonalUnsafePositions = (binaryString, n) => {
  const bitPositions = getBitPositions(binaryString);
  for (const position of bitPositions) {
    
  }
}; 

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
