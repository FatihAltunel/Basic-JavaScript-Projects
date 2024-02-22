document.querySelector('.auto-play-button').innerHTML='Auto Play';

let score=JSON.parse(localStorage.getItem('score')) || {
    Win:0,
    Lose:0,
    Tie:0
}

updateScore();

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove='';
    
    if(randomNumber>0 && randomNumber<1/3){
        computerMove='rock';
    }
    else if(randomNumber> 1/3 && randomNumber<2/3){
        computerMove='paper';
    }
    else{
        computerMove='scissor';
    }
    return computerMove;
}

function playGame(playerMove){
const computerMove = pickComputerMove();
let result='';
if(playerMove==='rock'){
    if(computerMove==='rock'){
        result='Tie.';
    }
    else if(computerMove==='paper'){
        result='You lose.';
    }
    else if(computerMove==='scissor'){
        result='You WIN!!!';
    }
}
else if(playerMove==='paper'){
    if(computerMove==='rock'){
        result='You WIN!!!';
    }
    else if(computerMove==='paper'){
        result='Tie.';
    }
    else if(computerMove==='scissor'){
        result='You lose.';
    }
}
else if(playerMove==='scissor'){
    if(computerMove==='rock'){
        result='You lose.';
    }
    else if(computerMove==='paper'){
        result='You WIN!!!';
    }
    else if(computerMove==='scissor'){
        result='Tie.';
    }
}

if(result==='You WIN!!!'){
    score.Win++;
    document.querySelector('.js-result').classList.add('result-color-green');
    document.querySelector('.js-result').classList.remove('result-color-yellow');
    document.querySelector('.js-result').classList.remove('result-color-red');
}
else if(result==='Tie.'){
    score.Tie++;
    document.querySelector('.js-result').classList.add('result-color-yellow');
    document.querySelector('.js-result').classList.remove('result-color-red');
    document.querySelector('.js-result').classList.remove('result-color-green');
}
else if(result==='You lose.'){
    score.Lose++;
    document.querySelector('.js-result').classList.add('result-color-red');
    document.querySelector('.js-result').classList.remove('result-color-green');
    document.querySelector('.js-result').classList.remove('result-color-yellow');
} 
localStorage.setItem('score', JSON.stringify(score));
updateScore();
typeResultAndMoves(result,playerMove,computerMove);
}

let isAutoPlaying=false;
let intervalID='';


function autoPlay(){
    if(!isAutoPlaying){
        intervalID = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove); 
        },1000);
        isAutoPlaying=true;
        document.querySelector('.auto-play-button').innerHTML='Stop Auto Playing';
    } else{
        isAutoPlaying=false;
        clearInterval(intervalID);
        document.querySelector('.auto-play-button').innerHTML='Auto Play';
    }
}

function subscribe(buttonClass){
const buttonElement = document.querySelector('.'+buttonClass);
if(buttonElement.innerHTML === 'Subscribe'){
    buttonElement.innerHTML ='Subscribed';
    buttonElement.classList.remove('subscribe-button');
    buttonElement.classList.add('subscribed-button');
} 
else{
    buttonElement.innerHTML = 'Subscribe';
    buttonElement.classList.add('subscribe-button');
    buttonElement.classList.remove('subscribed-button');
}
}

function updateScore(){
document.querySelector('.js-score')
    .innerHTML=`Win: ${score.Win}, Tie: ${score.Tie}, Lost: ${score.Lose}`;
}

function typeResultAndMoves(result, playerMove, computerMove){
document.querySelector('.js-result').innerHTML=`${result}`;
document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function reset(){
document.querySelector('.js-moves').innerHTML='';
document.querySelector('.js-result').innerHTML="";
}