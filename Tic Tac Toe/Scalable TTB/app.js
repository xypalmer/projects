var ttbApp = angular.module('ttbApp', []);

// ttbApp.controller('testCtrl', function ($scope) {
//   $scope.test = "hello";

// });

ttbApp.controller('ttbCtrl', function ($scope) {
  // //drop down menu options
  $scope.boardWidth = [3, 4, 5, 6, 7, 8];
  $scope.numConsW = [3, 4, 5, 6, 7, 8]
  $scope.numBombs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  $scope.widthOption = $scope.boardWidth[0];
  $scope.winOption = $scope.numConsW[0];
  $scope.bombOption = $scope.numBombs[2];

  //the board
  $scope.grid = [];
  $scope.gridRows = [];

  //making the board
  $scope.makeBoard = function(widthOption) {
  	for (i = 0; i < $scope.widthOption; i++) {
  		$scope.gridRows.push({val: 0, bomb: 0});
  	}
    for (i = 0; i < $scope.widthOption; i++) {
      $scope.grid.push($scope.gridRows);
    }
    $scope.p1_bombcounter = $scope.bombOption;
    $scope.p2_bombcounter = $scope.bombOption;
  }

  //check win array
  var winArrayX = [];
  var winArrayO = [];

  //pushing num of consecutive X's or O's needed to win.
  $scope.makewinArray = function(numConsW) {
  	for (i = 0; i < numConsW; i++) {
  		winArrayX.push(1);
  		winArrayO.push(-1);
  	}
  }

  //values on the grid
  var gridArray1 = [];
  var gridArray2 = [];

//--pushing values to the grid arrays
  var pushVal = function () {
  	for (i = 0; i < $scope.grid.length; i++ ) {
  		for( j = 0; j < $scope.row1.length; j++) {
  			//push row vals
  			gridArray1.push($scope.grid[i][j].val);
        //push column vals
        gridArray2.push($scope.grid[j][i].val);
  		}
      //spacing between pushes
      gridArray1.push("R");
      gridArray2.push("C");

      //
      // $scope.gridArray1.push($scope.grid[i][i].val);
      // $scope.gridArray2.push($scope.grid[i][2-r].val);

  		for (k = 0; k < $scope.grid.length - 1; k++) {
        //checks diagonals going downward to the left
        gridArray1.push($scope.grid[i+k][k].val);
        //checks diagonals going upward to the right
        gridArray2.push($scope.grid[k][i+k].val);
      }
      gridArray1.push("D1");
      gridArray2.push("D2");
    }
  }
//---end of pushVal()
  // X win counters
  var winCounterX1 = 0;
  var winCounterX2 = 0;
  // O win counters
  var winCounterO1 = 0;
  var winCounterO2 = 0;
//--check for wins by finding winArrays in gridArrays
  var checkWin = function () {
    for (i = 0; i < gridArray1.length; i++) {
      winCounterX1 = 0;
      winCounterX2 = 0;
      winCounterO1 = 0;
      winCounterO2 = 0;
      //checking for X's
      for (j = 0; j < winArrayX.length; j++) {
        if (gridArray1[i] == winArrayX[0]) {
          if (gridArray1[i+j] == winArrayX[j]) {
            winCounterX1++;
          }
        }
        if (gridArray2[i] == winArrayX[0]) {
          if (gridArray2[i+j] == winArrayX[j]) {
            winCounterX2++;
          }
        }
        //checking for O's
        if (gridArray1[i] == winArrayO[0]) {
          if (gridArray1[i+j] == winArrayO[j]) {
            winCounterO1++;
          }
        }
        if (gridArray2[i] == winArrayO[0]) {
          if (gridArray2[i+j] == winArrayO[j]) {
            winCounterO2++;
          }
        }
      }
      if (winCounterX1 == winArrayX.length || wincounterX2 == winArrayX.length) {
        alert("Player 1 Wins!")
      }
      if (winCounterO1 == winArrayO.length || wincounterO2 == winArrayO.length) {
        alert("Player 2 Wins!")
      }
    }
    resetGame();
  }

  //reset game after win
  var resetGame = function() {
    $scope.grid = [];
    winArrayX = [];
    winArrayO = [];
    gridArray1 = [];
    gridArray2 = [];
    }
//---end of checkWin()
  var turnCounter = 1;
  //bombs given

  $scope.inputVal = function (row, column) {
    console.log($scope.grid);
    console.log(turnCounter);
    if (turnCounter == 1) {
      //checking if bomb was already placed there
      if ($scope.grid[row][column].bomb == 0) {
      $scope.grid[row][column].bomb == "p1b";
      $scope.p1_bombcounter--;
      }
      else if ($scope.grid[row][column].bomb == "p1b") {
        alert("You already put a bomb there!");
      }

      if ($scope.p1_bombcounter == 0) {
        turnCounter++;
      }
    }
    else if (turnCounter == 2) {
      //checking if bomb was already placed there
      if ($scope.grid[row][column].bomb == 0) {
      $scope.grid[row][column].bomb == "p2b";
      $scope.p2_bombcounter--;
      }
      else if ($scope.grid[row][column].bomb == "p2b") {
        alert("You already put a bomb there!");
      }
      else if ($scope.grid[row][column].bomb == "p1b") {
        $scope.grid[row][column].bomb == "db"
        $scope.p2_bombcounter--;
      }

      if ($scope.p2_bombcounter == 0) {
        turnCounter++;
      }
    }
    //bombs done being placed, normal game begins -->
    else if (turnCounter % 2 == 1 ) {
      if ($scope.grid[row][column].val == 0 || $scope.grid[row][column].bomb == "p1b") {
          $scope.grid[row][column].val = 1;
          turnCounter++;
      }
      else if ($scope.grid[row][column].bomb == "p2b") {
          $scope.grid[row][column].val = 0;
          turnCounter++;
      }
      else if ($scope.grid[row][column].val == "db") {
          $scope.grid[row][column] = 0;
          turnCounter++;
      }        
    }
      else if (turnCounter % 2 === 0 ) {
          if ($scope.grid[row][column].val === 0 || $scope.grid[row][column].bomb === "p2b") {
              $scope.grid[row][column].val = -1; 
              turnCounter++;
          }
          else if ($scope.grid[row][column].bomb === "p1b") {
              $scope.grid[row][column].val = 0;
              turnCounter++;
          }
          else if ($scope.grid[row][column] === "db") {
              $scope.grid[row][column].val = 0;          
              turnCounter++;
          }
      }
    }


});

