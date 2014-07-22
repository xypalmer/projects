//color array for box background changes
var colorArray = ["#f5e6c4", "#ff7771", "#835c72", "#cb6e71", "#62bdb0", "#91dec3", "#f1d365", "#ec4a2b", "#5b1c35", "#bf6049", "#ff4749", "#ff9e77", "#006a6d", "#5e4557", "#8ea07d"];
var tcounter = 1;


var test = [];

var p1_discover = 1;
var p2_discover = 1;

var diagcounter1 = 0;
var diagcounter2 = 0;

var tttApp = angular.module('tttApp', []);

tttApp.controller('tttController', function ($scope) {
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
  $scope.grid =[$scope.row1, $scope.row2, $scope.row3];

    // $scope.backchange = {
    // background-color: ranColor;
    // }
  //rest after player 1 wins-player 2 now goes first.
  var p1_reset = function() {
    tcounter = 4;
    diagcounter1 = 0;
    diagcounter2 = 0;
    $scope.p1_bombcounter = 2;
    $scope.p2_bombcounter = 2;
    for (i = 0; i < $scope.grid.length; i++ ) {
       for (j = 0; j < $scope.grid.length; j++ ) {
        $scope.grid[i][j] = 0;
      }
    }
  };
  //reset after player 2 wins-player 1 now goes first.
  var p2_reset = function() {
    tcounter = 1;
    diagcounter1 = 0;
    diagcounter2 = 0;
    $scope.p1_bombcounter = 2;
    $scope.p2_bombcounter = 2;
    for (i = 0; i < $scope.grid.length; i++ ) {
      for (j = 0; j < $scope.grid.length; j++ ) {
        $scope.grid[i][j] = 0;
      }
    }
  };
  //check win function/add wins
  var checkWin = function() {
    for (r = 0; r < $scope.grid.length; r++ ) {  
      var rcounter = 0;
      for( c = 0; c < $scope.row1.length; c++) {
          rcounter += $scope.grid[r][c];
      }
      if (rcounter === 3) {
          alert("Player1 Wins!");
          p1_reset();
          $scope.p1_wins++;
      }
      else if (rcounter === -3) {
          alert("Player2 Wins!");
          p2_reset();
      }  

      var ccounter = 0;
      for ( crow = 0; crow < $scope.row1.length; crow++) {
          ccounter += $scope.grid[crow][r];
      }
      if (ccounter === 3) {
          alert("Player1 Wins!");
          p1_reset();
          $scope.p1_wins++;
      }
      else if (ccounter === -3) {
          alert("Player2 Wins!");
          p2_reset();
          $scope.p2_wins++;
      }
      diagcounter1 += $scope.grid[r][r];
      if (diagcounter1 === 3) {
          alert("Player1 Wins");
          p1_reset();
          $scope.p1_wins++;
      }
      else if (diagcounter1  === -3) {
          alert("Player2 Wins");
          p2_reset();
          $scope.p2_wins++;
      }
      diagcounter2 += $scope.grid[r][2 - r];
      if (diagcounter2  === 3) {
          alert("Player1 Wins");
          p1_reset();
          $scope.p1_wins++;
      }
      else if (diagcounter2  === -3) {
          alert("Player2 Wins");
          p2_reset();
          $scope.p2_wins++;
      }
    }
  };
  //the input function
  $scope.input = function(row, column) {
    //displaying 'X's and 'O's
    // if ($scope.grid[row][column] === 1) {
    //   $scope.player1_x = true;
    // }
    // else if ($scope.grid[row][column] === -1) {
    //   $scope.player2_o = true;
    // }
    //changing squares and background --->
    $scope.ranColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    $scope.bodColor = function () {
    $scope.ranColor2 = colorArray[Math.floor(Math.random() * colorArray.length)];
      while ($scope.ranColor == $scope.ranColor2) {
        $scope.ranColor2 = colorArray[Math.floor(Math.random() * colorArray.length)];
      }
    return $scope.ranColor2;
    }
    //<---
    //player 1 goes first --->
    if (tcounter === 1) {
      $scope.grid[row][column] = "p1b";
      $scope.p1_bombcounter--;
      if ($scope.p1_bombcounter === 0) {
        tcounter++;
      }
    }
    else if (tcounter === 2) {
      if ($scope.grid[row][column] === 0) {
      $scope.grid[row][column] = "p2b";
      }
      else if ($scope.grid[row][column] === "p1b") {
      $scope.grid[row][column] = "db";
      }
      $scope.p2_bombcounter--;
      if ($scope.p2_bombcounter === 0) {
        tcounter += 5;
      }
    }
    //<---
    //player 2 goes first --->
    else if (tcounter === 4) {
      $scope.grid[row][column] = "p2b";
      $scope.p1_bombcounter--;
      if ($scope.p1_bombcounter === 0) {
        tcounter++;
      }
    }
    else if (tcounter === 5) {
      if ($scope.grid[row][column] === 0) {
      $scope.grid[row][column] = "p1b";
      }
      else if ($scope.grid[row][column] === "p2b") {
      $scope.grid[row][column] = "db";
      }
      $scope.p2_bombcounter--;
      if ($scope.p2_bombcounter === 0) {
        tcounter ++;
      }
    }
    //<---
    //game beings -->
    else if (tcounter % 2 === 1 ) {
        if ($scope.grid[row][column] === 0 || $scope.grid[row][column] === "p1b") {
            $scope.grid[row][column] = 1;
            // $scope.insidebox[r][c] = "X";
            // I want the div to receive "X"
            // look at the DOM...find this box div...BY ID...place an X in div

            tcounter++;
        }
        else if ($scope.grid[row][column] === "p2b" ) {
            $scope.grid[row][column] = 0;
            $scope.explosion = 1;
            tcounter++;
        }
        else if ($scope.grid[row][column] === "db") {
            $scope.grid[row][column] = 0;
            $scope.bigexplosion = 1;
            tcounter++;
        }
    }
    else if (tcounter % 2 === 0 ) {
        if ($scope.grid[row][column] === 0 || $scope.grid[row][column] === "p2b") {
            $scope.grid[row][column] = -1; 
            // $scope.insidebox[r][c] = "O";
            tcounter++;
        }
        else if ($scope.grid[row][column] === "p1b") {
            $scope.grid[row][column] = 0;
            $scope.explosion = 1;
            tcounter++;
        }
        else if ($scope.grid[row][column] === "db") {
            $scope.grid[row][column] = 0;
            $scope.bigexplosion = 1;
            tcounter++;
        }
    }
    checkWin();
    diagcounter1 = 0;
    diagcounter2 = 0;
    $scope.explosion = null;
    $scope.bigexplosion = null;
  }

});

//   for (r = 0; r < $scope.grid.length; r++ ) {
//     var rcounter = 0;
//     for( c = 0; c < $scope.row1.length; c++) {
//         rcounter += $scope.grid[r][c];
//     }
//     if (rcounter == 3) {
//         alert("Player1 Wins!");
//     }
//     else if (rcounter == -3) {
//         alert("Player2 Wins!");
//     }  

//     var ccounter = 0;
//     for ( crow = 0; crow < $scope.row1.length; crow++) {
//         ccounter += $scope.grid[crow][r];
//     }
//     if (ccounter == 3) {
//         alert("Player1 Wins!");
//     }
//     else if (ccounter == -3) {
//         alert("Player2 Wins!");
//     }
//     diagcounter1 += $scope.grid[r][r];
//     if (diagcounter1 == 3) {
//         alert("Player1 Wins");
//     }
//     else if (diagcounter1  == -3) {
//         alert("Player2 Wis");
//     }
//     diagcounter2 += $scope.grid[r][2 - r];
//     if (diagcounter2  == 3) {
//         alert("Player1 Wins");
//     }
//     else if (diagcounter2  == 3) {
//         alert("Player2 Wins");
//     }
// }




