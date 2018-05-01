// Set up variables
const rollButton = document.getElementById('roll-die');
const betButton = document.getElementById('set-bet');
const diePips = document.getElementById('die-pips');
const dieShow = document.getElementById('die');
const bankRoll = document.getElementById('bank');
const dropDownRules = document.getElementById('drop-down');
const rulesList = document.getElementById('rules-list');
const resetButton = document.getElementById('reset-game');
const infoBox = document.getElementById('info');

let submitBet;
let submittedBet;
let bet = 1;
let roll;
let bank = 100;

// Set default states
bankRoll.innerHTML = `<h4>$${bank}</h4>`;
betButton.innerHTML = '<h2>Bet: $1</h2>'

// Set up functions
function getBet() {
	infoBox.innerHTML = 
	"<h2>What is your bet?</h2><input type='text' placeholder='Bet' id='bet'><input type='submit' id='submit-bet' value='Submit'>";
	infoBox.classList.add('slide');
	submitBet = document.getElementById('submit-bet');
	submitBet.addEventListener('click', setBet);
}
	
function setBet() {
	bet = document.getElementById('bet').value;

	if (bet > bank || bet < 1) {
		document.getElementById('bet').classList.add('danger');
		submitBet.value = 'Invalid bet';
	} else {
		infoBox.classList.remove('slide');
		betButton.innerHTML = `<h2>Bet: $${bet}</h2>`;
	}
}	


function rollDice() {

	// Make sure player can afford to roll
	if (bet > bank) {
		alert('Not enough money. Lower your bet.');
	} else {

		// Randomize the roll
		roll = Math.ceil(Math.random() * 6);

		// Show the die
		die.classList.add('show');

		// Add the die face
		diePips.setAttribute('src', `css/images/dice${roll}.svg`);

		// Announce result
		setTimeout(resolveGame, 100);
	}
}

function resolveGame() {
	if (roll > 3) {
		alert(`You rolled a ${roll} and won $${bet}!`);
		bank = bank + bet;
		bankRoll.innerHTML = `<h4>$${bank}</h4>`;
	} else {
		alert(`You rolled a ${roll} and lost your bet.`);
		bank = bank - bet;
		bankRoll.innerHTML = `<h4>$${bank}</h4>`;
	}

	if (bank === 0) {
		alert('You are broke. Better luck next time');
		resetButton.classList.add('show');
	}
}

// Set up event listeners
betButton.addEventListener('click', getBet);
rollButton.addEventListener('click', rollDice);
dropDownRules.addEventListener('click', toggleRules);
resetButton.addEventListener('click', resetGame);

// Responsive Event Listeners
function toggleRules() {
	rulesList.classList.toggle('show');
}

function resetGame() {
	bank = 100;
	bankRoll.innerHTML = `<h4>$${bank}</h4>`;
	bet = 1;
	betButton.innerHTML = `<h2>Bet: $${bet}</h2>`;
	resetButton.classList.remove('show');
}

