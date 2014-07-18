//color array for box background changes
var colorArray = ["#f5e6c4", "#ff7771", "#835c72", "#cb6e71", "#62bdb0", "#91dec3", "#6497a1", "#f1d365", "#ec4a2b", "#5b1c35" ];
var ranColor = colorArray[Math.floor(Math.random() * colorArray.length)];

var tcounter = 1;
var p1_wins = 0;
var p2_wins = 0;
var p_ties = 0;
var p1_bombcounter = 2;
var p2_bombcounter = 2;

var p1_discover = 1;
var p2_discover = 1;

var diagcounter1 = 0;
var diagcounter2 = 0;

var tttApp = angular.module('tttApp', []);

tttApp.controller('tttController', function ($scope) {
  $scope.row1 = [0, 0, 0];
  $scope.row2 = [0, 0, 0];
  $scope.row3 = [0, 0, 0];
  $scope.grid =[$scope.row1, $scope.row2, $scope.row3];
  $scope.test = "Hello";

    // $scope.backchange = {
    // background-color: ranColor;
    // }
  var p1_reset = function() {
    tcounter = 4;
    p1_bombcounter = 2;
    p2_bombcounter = 2;
    for (i = 0; i < $scope.grid.length; i++ ) {
       for (j = 0; j < $scope.grid.length; j++ ) {
        $scope.grid[i][j] = 0;
      }
    }
  }

  var p2_reset = function() {
    tcounter = 1;
    p1_bombcounter = 2;
    p2_bombcounter = 2;
    for (i = 0; i < $scope.grid.length; i++ ) {
      for (j = 0; j < $scope.grid.length; j++ ) {
        $scope.grid[i][j] = 0;
      }
    }
  }

  $scope.input = function(row, column) {
    //player 1 goes first --->
    if (tcounter == 1) {
      $scope.grid[row][column] = "p1b";
      p1_bombcounter--;
      if (p1_bombcounter == 0) {
        tcounter++;
      }
    }
    else if (tcounter == 2) {
      $scope.grid[row][column] = "p2b";
      p2_bombcounter--;
      if (p2_bombcounter == 0) {
        tcounter += 5;
      }
    }
    //<---
    //player 2 goes first --->
    else if (tcounter == 4) {
      $scope.grid[row][column] = "p2b";
      p1_bombcounter--;
      if (p1_bombcounter == 0) {
        tcounter++;
      }
    }
    else if (tcounter == 5) {
      $scope.grid[row][column] = "p1b";
      p2_bombcounter--;
      if (p2_bombcounter == 0) {
        tcounter ++;
      }
    }
    //<---
    //game beings -->
    else if (tcounter % 2 == 1 ) {
        if ($scope.grid[row][column] == 0 || $scope.grid[row][column] == "p1b") {
            $scope.grid[row][column] = 1;
            // $scope.insidebox[r][c] = "X";
            tcounter++;
        }
        else if ($scope.grid[row][column] == "p2b" ) {
            $scope.grid[row][column] = 0;
            tcounter++;
        }
    }
    else if (tcounter % 2 == 0 ) {
        if ($scope.grid[row][column] == 0 || $scope.grid[row][column] == "p2b") {
            $scope.grid[row][column] = -1; 
            // $scope.insidebox[r][c] = "O";
            tcounter++;
        }
        else if ($scope.grid[row][column] == "p1b") {
            $scope.grid[row][column] = 0;
            tcounter++;
        }
    }
    for (r = 0; r < $scope.grid.length; r++ ) {
      var rcounter = 0;
      for( c = 0; c < $scope.row1.length; c++) {
          rcounter += $scope.grid[r][c];
      }
      if (rcounter == 3) {
          alert("Player1 Wins!");
          p1_reset();
      }
      else if (rcounter == -3) {
          alert("Player2 Wins!");
          p2_reset();
      }  

      var ccounter = 0;
      for ( crow = 0; crow < $scope.row1.length; crow++) {
          ccounter += $scope.grid[crow][r];
      }
      if (ccounter == 3) {
          alert("Player1 Wins!");
          p1_reset();
      }
      else if (ccounter == -3) {
          alert("Player2 Wins!");
          p2_reset();
      }
      diagcounter1 += $scope.grid[r][r];
      if (diagcounter1 == 3) {
          alert("Player1 Wins");
          p1_reset();
      }
      else if (diagcounter1  == -3) {
          alert("Player2 Wis");
          p2_reset();
      }
      diagcounter2 += $scope.grid[r][2 - r];
      if (diagcounter2  == 3) {
          alert("Player1 Wins");
          p1_reset();
      }
      else if (diagcounter2  == 3) {
          alert("Player2 Wins");
          p2_reset();
      }
    }
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




