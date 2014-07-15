// changing the value version:
// var input = "O";
// function clickBox(box) {
// 	if (input == "O") {
// 		input = "X";
// 	}
// 	else {
// 		input = "O";
// 	}
// 	document.getElementById(box).innerHTML = input;
// }
 
// counter version:
var square1 = 0;
var counter = 1;
var input = "X";
var row1 = 0;
var row2 = 0;
var row3 = 0;
var col1 = 0;
var col2 = 0;
var col3 = 0;
var hor1 = 0;
var hor2 = 0;

// box1.value = 0;
// box2.value = 0;
// box3.value = 0;
// box4.value = 0;
// box5.value = 0;
// box6.value = 0;
// box7.value = 0;
// box8.value = 0;
// box9.value = 0;

var p1winscounter = 0;
var p2winscounter = 0;
var tiecounter = 0;

function clickBox(box) {
	if (document.getElementById(box).value == undefined) {
		if (counter % 2 == 1) {
			input = "X";
		}
		else {
			input = "O";
		}
		document.getElementById(box).innerHTML = input;
		if (input == "X") {
		document.getElementById(box).value = 1;
		}
		else if (input == "O") {
		document.getElementById(box).value = 4;
		}
		counter++;

		row1 = box1.value + box2.value + box3.value;
		row2 = box4.value + box5.value + box6.value;
		row3 = box7.value + box8.value + box9.value;

		col1 = box1.value + box4.value + box7.value;
		col2 = box2.value + box5.value + box8.value;
		col3 = box3.value + box6.value + box9.value;

		hor1 = box1.value + box5.value + box9.value;
		hor2 = box3.value + box5.value + box7.value;

		if (row1 == 3 || row2 == 3 || row3 == 3 || col1 == 3 || col2 == 3 || col3 == 3 || hor1 == 3 || hor2 == 3) {
			alert("Player 1 Wins!");
			p1winscounter++;
			for (var i = 0; i < document.getElementsByClassName("box").length; i++) {
				document.getElementsByClassName("box")[i].innerHTML = "";
				document.getElementsByClassName("box")[i].value = undefined;
			}
		}
		else if (row1 == 12 || row2 == 12 || row3 == 12 || col1 == 12 || col2 == 12 || col3 == 12 || hor1 == 12 || hor2 == 12) {
			alert("Player 2 Wins!");
			p2winscounter++;
			for (var i = 0; i < document.getElementsByClassName("box").length; i++) {
				document.getElementsByClassName("box")[i].innerHTML = "";
				document.getElementsByClassName("box")[i].value = undefined;
			}
		}
		else if (box1.value !== undefined && box2.value !== undefined && box3.value !== undefined && box4.value !== undefined && box5.value !== undefined && box6.value !== undefined && box7.value !== undefined && box8.value !== undefined && box9.value !== undefined) {
			alert("It's a tie!");
			tiecounter++;	
			for (var i = 0; i < document.getElementsByClassName("box").length; i++) {
				document.getElementsByClassName("box")[i].innerHTML = "";
				document.getElementsByClassName("box")[i].value = undefined;
			}		
		}
	};
	document.getElementById("player1").innerHTML = p1winscounter.toString();
	document.getElementById("player2").innerHTML = p2winscounter.toString();
	document.getElementById("ties").innerHTML = tiecounter.toString();
};






// eval("square" + box.split("x")[1] + "=" + 2)


// var square1 = document.getElementById(box1);
//to reset: window rest or set value to ""
