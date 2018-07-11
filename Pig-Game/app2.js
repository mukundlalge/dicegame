/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,activePlayer,roundScore,gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying)
    {
        var dice1,dice2;
        dice1=Math.floor((Math.random() * 6) + 1);
        dice2=Math.floor((Math.random() * 6) + 1);

        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';

        document.getElementById('dice-1').src='dice-'+dice1+'.png';
        document.getElementById('dice-2').src='dice-'+dice2+'.png';
        

        if(dice1!==1 && dice2!==1)
        {
            roundScore += (dice1+dice2);
            document.getElementById('current-' + activePlayer).textContent=roundScore;
        }
        else
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){

    //add roundoff score to main score...
    scores[activePlayer]+=roundScore;

    if(gamePlaying)
    {

        // to update the user interface..
        document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];

        //to change final value of score using input type...
        var input =document.querySelector('.final-score').value;
        var winningScore;

        if(input)
        {
            winningScore=input;
        }
        else
        winningScore=100;

        //check if player is win or not...
        if(scores[activePlayer]>=winningScore)
        {
            document.getElementById('name-'+activePlayer).textContent='Winner !';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-2').style.display='none';

            gamePlaying=false;
            
        }
        else
        nextPlayer();

    }
    
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer()
{
    activePlayer===0 ?activePlayer=1 :activePlayer=0;
    roundScore=0;

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';

    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
function init()
{
    scores=[0,0];
    activePlayer=0;
    roundScore=0;
    gamePlaying=true;

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';

    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');


    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}
