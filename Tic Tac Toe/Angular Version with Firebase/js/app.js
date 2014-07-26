var tttApp = angular.module("tttApp", ["firebase"]);

tttApp.controller('tttController', ['$scope', '$timeout', '$firebase', function ($scope, $timeout, $firebase) {
  // var tttRef = new Firebase('https://ttbomber.firebaseio.com');

  // $scope.gridContainer = {
  //   gridArray: $scope.grid,
  // }

  // $scope.$watch('gridContainer.gridArray', function() {
  //   console.log('Model changed!');
  // })

  // $scope.tttRef.$bind($scope, "gridContainer");

  var colorArray = ["#f5e6c4", "#ff7771", "#835c72", "#cb6e71", "#62bdb0", "#91dec3", "#6497a1", "#f1d365", "#ec4a2b", "#5b1c35", "#bf6049", "#ff9e77", "#006a6d", "#5e4557", "#8ea07d"];
  var tcounter = 1;

  $scope.playerTurn = 2;
  $scope.playerWin = 0;

  var diagcounter1 = 0;
  var diagcounter2 = 0;

  var p1shovelcounter = 1;
  var p2shovelcounter = 1;

  $scope.explosion = 0;
  $scope.bigexplosion = 0;

  $scope.p1_wins = 0;
  $scope.p2_wins = 0;
  $scope.p_ties = 0;

  $scope.p1_bombcounter = 2;
  $scope.p2_bombcounter = 2;
 
  $scope.row1 = [0, 0, 0];
  $scope.row2 = [0, 0, 0];
  $scope.row3 = [0, 0, 0];
  $scope.grid = [$scope.row1, $scope.row2, $scope.row3];

  // $scope.grid =[
  //   [0, 0, 0], 
  //   [0, 0, 0], 
  //   [0, 0, 0]
  // ];


  var decimate = function () {
    $scope.explosion = 1;
    $timeout(function() {
      $scope.explosion = 0;
      }, 3000);
  }
  var doubleexplosion = function () {
    $scope.bigexplosion = 1;
    $timeout(function() {
      $scope.bigexplosion = 0;
    }, 3000);
  }
    // $scope.backchange = {
    // background-color: ranColor;
    // }
  //rest after player 1 wins-player 2 now goes first.
  $scope.p1_reset = function() {
    tcounter = 4;
    diagcounter1 = 0;
    diagcounter2 = 0;
    $scope.p1_wins++;
    $scope.playerWin = 0;
    $scope.p1_bombcounter = 2;
    $scope.p2_bombcounter = 2;
    console.log("hello");
    for (i = 0; i < $scope.grid.length; i++ ) {
       for (j = 0; j < $scope.grid.length; j++ ) {
        $scope.grid[i][j] = 0;
      }
    }
  };
  //reset after player 2 wins-player 1 now goes first.
  $scope.p2_reset = function() {
    tcounter = 1;
    diagcounter1 = 0;
    diagcounter2 = 0;
    $scope.p1_wins++;
    $scope.playerWin = 0;
    $scope.p1_bombcounter = 2;
    $scope.p2_bombcounter = 2;
    for (i = 0; i < $scope.grid.length; i++ ) {
      for (j = 0; j < $scope.grid.length; j++ ) {
        $scope.grid[i][j] = 0;
      }
    }
  };
  var checkTie = function () {
    var tiecounter = 0;
    for (r = 0; r < $scope.grid.length; r++) {
      for (c = 0; c <$scope.grid.length; c++) {
        if ($scope.grid[r][c] == 1 || $scope.grid[r][c] == -1) {
          tiecounter++;
        }
      }
    }
    if (tiecounter == 9) {
      $scope.p_ties++;
      $scope.playerWin = 3;
    }
  }
  //check win function/add wins
  var checkWin = function() {
    for (r = 0; r < $scope.grid.length; r++ ) {  
      var rcounter = 0;
      for( c = 0; c < $scope.grid.length; c++) {
          rcounter += $scope.grid[r][c];
      }
      if (rcounter === 3) {
          $scope.playerWin = 1;
      }
      else if (rcounter === -3) {
          $scope.playerWin = 2;
      }  

      var ccounter = 0;
      for ( crow = 0; crow < $scope.grid.length; crow++) {
          ccounter += $scope.grid[crow][r];
      }
      if (ccounter === 3) {
          $scope.playerWin = 1;
      }
      else if (ccounter === -3) {
          $scope.playerWin = 2;
      }
      diagcounter1 += $scope.grid[r][r];
      if (diagcounter1 === 3) {
          $scope.playerWin = 1;
      }
      else if (diagcounter1  === -3) {
          $scope.playerWin = 2;
      }
      diagcounter2 += $scope.grid[r][2 - r];
      if (diagcounter2  === 3) {
          $scope.playerWin = 1;
      }
      else if (diagcounter2  === -3) {
          $scope.playerWin = 2;
      }
    }
  };
  // random color picker --->
  $scope.bodColor = function () {
    var colIdx1 = Math.floor(Math.random() * colorArray.length);
    $scope.ranColor = colorArray[colIdx1];
    var colIdx2 = Math.floor(Math.random() * (colorArray.length - 1));
    if(colIdx1 <= colIdx2)
      colIdx2 ++;
    $scope.ranColor2 = colorArray[colIdx2];
    // console.log(colIdx1, colIdx2);
  }
  //<----
  //runing the color picker--->
  $scope.bodColor();
  //<----
  $scope.p1shovelinput = function () {
    if (p1shovelcounter = 1) {
      p1shovelcounter--;
      $scope.p1shovel = true;
    }
  }

  $scope.p2shovelinput = function () {
    if (p2shovelcounter = 1) {
      p2shovelcounter--;
      $scope.p2shovel = true;
    }
  }

  //the input function
  $scope.input = function(row, column) {
    if ($scope.p1shovel == true) {
      if ($scope.grid[row][column] == "p2b" || $scope.grid[row][column] == "db") {
        $scope.grid[row][column] = 0;
        alert("A bomb was removed!");
        $scope.p1shovel = false;
      }
      else {
        alert("No bomb was found!?");
        $scope.p1shovel = false;
      }
    }
    else if ($scope.p2shovel == true) {
      if ($scope.grid[row][column] == "p1b" || $scope.grid[row][column] == "db") {
        $scope.grid[row][column] = 0;
        alert("A bomb was removed!");
        $scope.p2shovel = false;
      }
      else {
        alert("No bomb was found!?");
        $scope.p2shovel = false;
      }
    }
    else {
      //changing squares and background --->
      $scope.bodColor();
      // <---
      //player 1 goes first --->
      if (tcounter === 1) {
        $scope.playerTurn = 2;
        $scope.grid[row][column] = "p1b";
        $scope.p1_bombcounter--;
        if ($scope.p1_bombcounter === 0) {
          tcounter++;
          $scope.playerTurn = 1;
        }
      }
      else if (tcounter === 2) {
        $scope.playerTurn = 1;
        if ($scope.grid[row][column] === 0) {
          $scope.grid[row][column] = "p2b";
        }
        else if ($scope.grid[row][column] === "p1b") {
          $scope.grid[row][column] = "db";
        }
        $scope.p2_bombcounter--;
        if ($scope.p2_bombcounter === 0) {
          tcounter += 5;
          $scope.playerTurn = 2;
        }
      }
      //<---
      //player 2 goes first --->
      else if (tcounter === 4) {
        $scope.playerTurn = 1;
        $scope.grid[row][column] = "p2b";
        $scope.p1_bombcounter--;
        if ($scope.p1_bombcounter === 0) {
          tcounter++;
          $scope.playerTurn = 2;
        }
      }
      else if (tcounter === 5) {
        $scope.playerTurn = 2;
        if ($scope.grid[row][column] === 0) {
          $scope.grid[row][column] = "p1b";
        }
        else if ($scope.grid[row][column] === "p2b") {
          $scope.grid[row][column] = "db";
        }
          $scope.p2_bombcounter--;
        if ($scope.p2_bombcounter === 0) {
          tcounter ++;
          $scope.playerTurn = 1;
        }
      }
      //<---
      //game beings -->
      else if (tcounter % 2 === 1 ) {
          $scope.playerTurn = 1;
          if ($scope.grid[row][column] === 0 || $scope.grid[row][column] === "p1b") {
              $scope.grid[row][column] = 1;
              tcounter++;
          }
          else if ($scope.grid[row][column] === "p2b") {
              $scope.grid[row][column] = 0;
              decimate();
              console.log($scope.explosion);
              tcounter++;
          }
          else if ($scope.grid[row][column] === "db") {
              $scope.grid[row][column] = 0;
              decimate();
              doubleexplosion();
              tcounter++;
          }        
      }
      else if (tcounter % 2 === 0 ) {
          $scope.playerTurn = 2;
          if ($scope.grid[row][column] === 0 || $scope.grid[row][column] === "p2b") {
              $scope.grid[row][column] = -1; 
              tcounter++;
          }
          else if ($scope.grid[row][column] === "p1b") {
              $scope.grid[row][column] = 0;
              decimate();
              tcounter++;
          }
          else if ($scope.grid[row][column] === "db") {
              $scope.grid[row][column] = 0;
              decimate();
              doubleexplosion();
              tcounter++;
          }
      }
      checkWin();
      if ($scope.playerWin == 0) {
        checkTie();
      }
      diagcounter1 = 0;
      diagcounter2 = 0;
    }
  }

}]);







