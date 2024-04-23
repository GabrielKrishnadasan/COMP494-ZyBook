let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function() { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame() {
	// TODO: Complete the function
	//1
	clearTimeout(computerMoveTimeout);
	computerMoveTimeout = 0;

	//2
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.innerHTML = "";
    
    button.classList.remove("x");
    button.classList.remove("o");
    
    button.removeAttribute("disabled");
	}

	//3
	playerTurn = true;

	//4
	var turnInfoTxt = document.getElementById("turnInfo");
	turnInfoTxt.innerHTML = "Your turn";
}

function boardButtonClicked(button) {
	// TODO: Complete the function
	if (playerTurn) {
		//1
		button.innerHTML = "X";
		
		//2
		button.classList.add("x");
    button.classList.remove("o");
		
		//3
		button.setAttribute("disabled", true);
		
		//4
		switchTurn();
	}
}

function switchTurn() {
	// TODO: Complete the function
	//1
	var status = checkForWinner();
	var turnInfoTxt = document.getElementById("turnInfo");

	if (status == 1) {
		if (playerTurn) {
    	turnInfoTxt.innerHTML = "Computer's turn";
      playerTurn = !playerTurn;
			computerMoveTimeout = setTimeout(makeComputerMove, 1000);
		} else {
    	playerTurn = !playerTurn;
			turnInfoTxt.innerHTML = "Your turn";
		}
    
	} else {
  	playerTurn = false;
		if (status == 2) {
			turnInfoTxt.innerHTML = "You win!";
		}
		if (status == 3) {
			turnInfoTxt.innerHTML = "Computer wins!";
		}
		if (status == 4) {
			turnInfoTxt.innerHTML = "Draw game";
		}
	}


}

function makeComputerMove() {
	// TODO: Complete the function
	const buttons = getGameBoardButtons();

	var arr = [];

	for (let button of buttons) {
		if (!button.getAttribute("disabled")) {
			arr.push(button);
		}
	}

	var randomIndex = Math.floor(Math.random() * arr.length);
  	var selectedButton = arr[randomIndex];

	selectedButton.innerHTML = 'O';

  selectedButton.classList.add("o");
  selectedButton.classList.remove("x");

	selectedButton.setAttribute('disabled', true);
	
  switchTurn();
}