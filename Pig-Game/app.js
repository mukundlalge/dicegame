/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1.Random Number...
        var dice1 = Math.floor((Math.random() * 6) +1);
        var dice2 = Math.floor((Math.random() * 6) +1);
                
        // 2.Display the result...
       
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';
          
        document.getElementById('dice-1').src='dice-'+dice1+'.png';
        document.getElementById('dice-2').src='dice-'+dice2+'.png';
        
        

        //update the round score if rolled number is not 1...
        if (dice1 !==1 && dice2 !==1) {
            //add score...
            roundScore += (dice1+dice2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
            //next player...
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //add current  score to global score...
        scores[activePlayer] += roundScore;

        //update user interface...
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Final score change if user wants...
        var input=document.querySelector('.final-score').value;
        var winnningScore;

        //Anything like undifined ,null,0 coerced set to false..
        //anything else set to true...
        if(input)
        {
            winnningScore=input;
        }
        else
        {
            winnningScore=100;
        }

        //check if player won the Game...
        if (scores[activePlayer] >=winnningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner !';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            
            gamePlaying = false;
        }
        else
            //nxt player...
            nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}