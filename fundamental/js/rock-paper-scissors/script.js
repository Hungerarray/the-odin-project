console.clear();

function computerPlay() {
    const num = Math.ceil(Math.random() * 3);

    switch (num) {
        case 1: return 'rock';
        case 2: return 'paper';
        case 3: return 'scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection === computerSelection)
        return 'Match ended in a draw';
    else if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
             (playerSelection === 'paper' && computerSelection === 'rock') ||
             (playerSelection === 'scissors' &&
              computerSelection === 'paper')) {
        return `You win! ${playerSelection} beats ${computerSelection}`;
    }
    return `You lose! ${computerSelection} beats ${playerSelection}`;
}

function updateScore(message, scores) {
    const reg = /win/;
    if (message.search(/win/) !== -1)
        scores.player++;
    else if (message.search(/lose/) !== -1)
        scores.computer++;
}

function game() {
    const scores = {player: 0, computer: 0};

    for (let i = 0; i < 5; ++i) {
        const playerSelection =
            window.prompt('Your choice ?', 'rock or paper or scissors');

        const computerSelection = computerPlay();
        const msg               = playRound(playerSelection, computerSelection);
        updateScore(msg, scores);
        console.log(msg);
    }

    console.log('final scores:');
    console.log(scores);
}

game();