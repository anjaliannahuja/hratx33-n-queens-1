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
window.findNRooksSolution = function(n, bitPositions = [], initialBit = 1, numRooks = 1) {
  if (bitPositions.length === 0) bitPositions[0] = initialBit;
  bitPositions.sort((a, b) => a - b);

  //Get index + 1 of every bit in the binaryString, put those into binaryPositions
  const unsafePositions = findUnsafePositions(bitPositions, n);
  //Calculate next available position for rook
  const positionToOccupy = findNextPosition(unsafePositions, n);
  if (positionToOccupy === -1) {
    return [numRooks, convertBitPositionsToString(bitPositions), convertBitPositionsToBoard(bitPositions, n)];
  }
  bitPositions.push(positionToOccupy);
  return window.findNRooksSolution(n, bitPositions, initialBit, numRooks + 1);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  const solutions = new Set([]);
  for (let count = 1; count <= Math.pow(n, 2); count++) {
    const possibleSolution = window.findNRooksSolution(n, [], count);
    console.log(JSON.stringify(possibleSolution));
    if (possibleSolution[0] >= n) solutions.add(possibleSolution[1]);    
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutions.size);
  return solutions.size;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, bitPositions = [], initialBit = 1, numQueens = 1) {
  if (bitPositions.length === 0) bitPositions[0] = initialBit;  
  bitPositions.sort((a, b) => a - b);
  //Get index + 1 of every bit in the binaryString, put those into binaryPositions
  const unsafeRowsAndCols = findUnsafePositions(bitPositions, n);
  const unsafeDiags = calculateDiagonalUnsafePositions(bitPositions, n);
  const unsafePositions = mergeAndSortUnsafePositions(unsafeRowsAndCols, unsafeDiags);
  //Calculate next available position for rook
  const positionToOccupy = findNextPosition(unsafePositions, n);
  if (positionToOccupy === -1) {
    return [numQueens, convertBitPositionsToString(bitPositions), convertBitPositionsToBoard(bitPositions, n)];
  }
  bitPositions.push(positionToOccupy);
  return window.findNQueensSolution(n, bitPositions, initialBit, numQueens + 1);
}; 

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  const solutions = new Set([]);
  for (let count = 1; count <= Math.pow(n, 2); count++) {
    const possibleSolution = window.findNQueensSolution(n, [], count)
    JSON.stringify(possibleSolution)
    if (possibleSolution[0] >= n) solutions.add(possibleSolution[1]);    
  }
  console.log('Number of solutions for ' + n + ' queens:', solutions.size);
  return solutions.size;
};





//*****************HELPER FUNCTIONS*********************//


const convertBitPositionsToString = (bitPositions) => {
  bitPositions.sort((a, b) => {
    return a - b;
  });
  return bitPositions.join();
}


const convertBitPositionsToBoard = (bitPositions, n) => {
  let binaryString = '';
  for (let index = 0; index < Math.pow(n, 2); index++) {
    binaryString += '0';
  }
  for (const position of bitPositions) {
    binaryString = binaryString.substring(0, position - 1) + '1' + binaryString.substring(position);
  }
  return convertStringToBoard(binaryString, n);
}

const convertStringToBoard = (binaryString, n) => {
    const splitBoardByN = [];
    for (let index = 0; index < binaryString.length; index += n) {
      splitBoardByN.push(binaryString.substr(index, n).split(''));
    }
    return splitBoardByN;
}





const findUnsafePositions = (bitPositions, n) => {
  //Calculate unsafe positions for each bit in bitPositions, then sort the unsafe positions
  //and remove duplicates
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
  if (unsafePositions[0] > 1) {
    return unsafePositions[0] - 1;
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





const calculateDiagonalUnsafePositions = (bitPositions, n) => {
  //const bitPositions = getBitPositions(binaryString);
  const unsafePositions = [];
  for (const position of bitPositions) {
    let downRightDiag = position;
    // Check both base conditions for being on outside of matrix
    while (!((downRightDiag >= 1 && downRightDiag <= n) || downRightDiag % n === 1)) {
      downRightDiag = downRightDiag - (n + 1);
    } 

    while (!(downRightDiag % n === 0 || (downRightDiag > n * (n - 1) && downRightDiag <= n * n))) {
      unsafePositions.push(downRightDiag);
      downRightDiag = downRightDiag + (n + 1);
    }

    unsafePositions.push(downRightDiag);

    let upRightDiag = position;
    while (!((upRightDiag > n * (n - 1) && upRightDiag <= n * n) || upRightDiag % n === 1)) {
      upRightDiag = upRightDiag + (n - 1);
    }

    while (!((upRightDiag >= 1 && upRightDiag <= n) || upRightDiag % n === 0)) {
      unsafePositions.push(upRightDiag);
      upRightDiag = upRightDiag - (n - 1);
    }

    unsafePositions.push(upRightDiag);
  }

  return unsafePositions;
};

const mergeAndSortUnsafePositions = (unsafeRowsAndCols, unsafeDiags) => {
  const unsafePositions = unsafeDiags.concat(unsafeRowsAndCols);

  return unsafePositions.sort((a, b) => a - b).filter(function(item, pos, ary) {
    return !(item === ary[pos - 1]);
  });
}