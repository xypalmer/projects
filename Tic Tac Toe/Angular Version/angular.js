// var box = [];
// var row1 = [1, 0, 0];
// var row2 = [0, 1, 0];
// var row3 = [0, 0, 1];
// var grid = [row1, row2, row3];

// var grid = [row1, row2, row3];
// console.log(grid[0][0]);
// //r = rows
// //c = columns
// var diagcounter1 = 0;
// var diagcounter2 = 0;
var tttApp = angular.module('tttApp', []);

tttApp.controller('tttController', function ($scope) {
  $scope.row1 = [0, 0, 0];
  $scope.row2 = [0, 0, 0];
  $scope.row3 = [0, 0, 0];
  $scope.grid =[$scope.row1, $scope.row2, $scope.row3];
  $scope.test = "Hello";

});

// for (r = 0; r < grid.length; r++ ) {
//     var rcounter = 0;
//     for( c = 0; c < row1.length; c++) {
//     	rcounter += grid[r][c];
//     }
//     if (rcounter == 3) {
//     	alert("Player1 Wins!");
//     }
//     else if (rcounter == -3) {
//     	alert("Player2 Wins!");
//     }  

//     var ccounter = 0;
//     for ( crow = 0; crow < row1.length; crow++) {
//     	ccounter += grid[crow][r];
// 	}
//     if (ccounter == 3) {
//     	alert("Player1 Wins!");
//     }
//     else if (ccounter == -3) {
//     	alert("Player2 Wins!");
//     }
//     diagcounter1 += grid[r][r];
//     if (diagcounter1 == 3) {
//     	alert("Player1 Wins");
//     }
//     else if (diagcounter1  == -3) {
//     	alert("Player2 Wis");
//     }
//     diagcounter2 += grid[r][2 - r];
//     if (diagcounter2  == 3) {
//     	alert("Player1 Wins");
//     }
//     else if (diagcounter2  == 3) {
//     	alert("Player2 Wins");
//     }
// }
