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
  let board = startBoard + (1 << initial);
  let binaryString = '';
  //Put binary representation of board into binaryString
  const findBinaryRepresentation = number => {
    if (number === 0) return undefined;
    binaryString += '' + (number % 2);
    findBinaryRepresentation(Math.floor(number/2));
  }
  findBinaryRepresentation(board);
  //Get index + 1 of every bit in the binaryString, put those into binaryPositions
  const findUnsafePositions = binaryString => {
    let flippedString = binaryString.reverse();
    //Positions with a 1
    const bitPositions = [];
    for (let stringIndexPos = 0; stringIndexPos < flippedString.length; stringIndexPos++) {
      if (flippedString[stringIndexPos] === 1) bitPositions.push(stringIndexPos + 1);
    }
    //Calculate unsafe positions for each bit in bitPositions, then sort the unsafe positions
    //and remove duplicates
    const unsafePositions = [];
    for (const position of bitPositions) {
      
    }
  }
  const unsafePositions = findUnsafePositions(binaryString);

  //Calculate next available position for rook
  const findNextPosition = unsafePositions => {
    return unsafePositions.reduce((availablePositon, takenPosition, index) => {
      //If next available position has not been found
      if (availablePositon === -1) {
        //If the next position equals this position + 1, then the next bit is not safe
        if (takenPosition + 1 !== unsafePositions[index + 1]) {
          availablePositon = takenPosition + 1;
          return availablePositon;
        }
      }
      return availablePositon;
    }, -1);
  }
  const positionToOccupy = findNextPosition(unsafePositions);
  board += (1 << (positionToOccupy - 1));
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

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
