//color array for box background changes
var colorArray = ["#f5e6c4", "#ff7771", "#835c72", "#cb6e71", "#62bdb0", "#91dec3", "#6497a1", "#f1d365", "#ec4a2b", "#5b1c35" ];
var ranColor = colorArray[Math.floor(Math.random() * colorArray.length)];

var diagcounter1 = 0;
var diagcounter2 = 0;
var tcounter = 1;
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

  $scope.input = function(row, column) {
    if (tcounter % 2 == 1 ) {
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
      }
      else if (rcounter == -3) {
          alert("Player2 Wins!");
      }  

      var ccounter = 0;
      for ( crow = 0; crow < $scope.row1.length; crow++) {
          ccounter += $scope.grid[crow][r];
      }
      if (ccounter == 3) {
          alert("Player1 Wins!");
      }
      else if (ccounter == -3) {
          alert("Player2 Wins!");
      }
      diagcounter1 += $scope.grid[r][r];
      if (diagcounter1 == 3) {
          alert("Player1 Wins");
      }
      else if (diagcounter1  == -3) {
          alert("Player2 Wis");
      }
      diagcounter2 += $scope.grid[r][2 - r];
      if (diagcounter2  == 3) {
          alert("Player1 Wins");
      }
      else if (diagcounter2  == 3) {
          alert("Player2 Wins");
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




