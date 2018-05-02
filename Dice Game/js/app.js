// Set up variables
const rollButton = document.getElementById('roll-die');
const betButton = document.getElementById('set-bet');
const diePips = document.getElementById('die-pips');
const dieShow = document.getElementById('die');
const bankRoll = document.getElementById('bank');
const dropDownRules = document.getElementById('drop-down');
const rulesList = document.getElementById('rules-list');
const resetButton = document.getElementById('reset-game');
const betBox = document.getElementById('bet-box');
const resultsBox = document.getElementById('results-box');

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
	betBox.classList.add('slide');
	submitBet = document.getElementById('submit-bet');
	submitBet.addEventListener('click', setBet);
}
	
function setBet(e) {
	bet = Number(document.getElementById('bet').value);

	if (bet > bank || bet < 1) {
		document.getElementById('bet').classList.add('danger');
		submitBet.value = 'Invalid bet';
		setTimeout( () => submitBet.value = 'Submit', 1500);
	} else {
		betBox.classList.remove('slide');
		betButton.innerHTML = `<h2>Bet: $${bet}</h2>`;
	}
}	


function rollDice() {

	// Make sure player can afford to roll
	if (bet > bank) {
		resultsBox.innerHTML = '<h3>Not enough money. Lower your bet.</h3>';
		resultsBox.classList.add('slide');
		setTimeout(() => resultsBox.classList.remove('slide'), 2000);
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
		resultsBox.innerHTML = `<h3>You rolled a ${roll} and won $${bet}!</h3>`;
		resultsBox.classList.add('slide');
		setTimeout(() => resultsBox.classList.remove('slide'), 2000);
		bank = bank + bet;
		bankRoll.innerHTML = `<h4>$${bank}</h4>`;
	} else {
		resultsBox.innerHTML = `<h3>You rolled a ${roll} and lost your bet.</h3>`;
		resultsBox.classList.add('slide');
		setTimeout(() => resultsBox.classList.remove('slide'), 2000);
		bank = bank - bet;
		bankRoll.innerHTML = `<h4>$${bank}</h4>`;
	}

	if (bank === 0) {
		setTimeout(() => {
			resultsBox.innerHTML = 'You are broke. Better luck next time';
			resultsBox.classList.add('slide');
			setTimeout(() => resultsBox.classList.remove('slide'), 2000);
			resetButton.classList.add('show');
		}, 2000);
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

