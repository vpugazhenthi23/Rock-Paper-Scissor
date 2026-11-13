let score = JSON.parse(localStorage.getItem('score'))
    || {
    wins: 0,
    Lose: 0,
    Ties: 0
};
document.querySelector('.js-reset').addEventListener('click', () => {
    document.querySelector('.js-text')
        .innerHTML = "<p>Do You want to reset the Score ? <button class='cs-yes'>Yes</button> <button class='cs-no'>No</button>"
    document.querySelector('.cs-yes').addEventListener('click', () => {
        score.wins = 0;
        score.Lose = 0;
        score.Ties = 0;
        localStorage.removeItem('score');
        scc();
        document.querySelector('.move').innerHTML = '';
        document.querySelector('.results').innerHTML = '';

        document.querySelector('.js-text').innerHTML = "";
    })
    document.querySelector('.cs-no').addEventListener('click',()=>{
        document.querySelector('.js-text').innerHTML = "";
    })
   /*  score.wins = 0;
    score.Lose = 0;
    score.Ties = 0;
    localStorage.removeItem('score');
    scc();
    document.querySelector('.move').innerHTML = '';
    document.querySelector('.results').innerHTML = ''; */
})
let functionPlay = false;
let setId;
let autoAlertTimeout;

function showAutoAlert(isOn) {
    const autoAlert = document.querySelector('.auto-alert');
    autoAlert.textContent = `Auto mode is ${isOn ? 'on' : 'off'}.`;
    autoAlert.classList.toggle('is-on', isOn);
    autoAlert.classList.add('is-visible');
    clearTimeout(autoAlertTimeout);
    autoAlertTimeout = setTimeout(() => {
        autoAlert.classList.remove('is-visible');
    }, 2500);
}

function playAuto() {
    if (!functionPlay) {
        setId = setInterval(function () {
            const num = rpc();
            update(num)
        }, 1000)
        functionPlay = true;
    }
    else {
        clearInterval(setId);
        functionPlay = false;
    }
    const btn = document.querySelector('.auto-btn');
    if (btn.innerText === 'Auto-OFF') {
        btn.innerText = 'Auto-ON';
        btn.classList.add('on-btn')

    }

    else {
        btn.innerText = 'Auto-OFF';
        btn.classList.remove('on-btn');

    }
    showAutoAlert(functionPlay);

}
scc();
document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        playAuto()
    }
})
function update(game) {
    const move = rpc();
    let result = ' ';

    if (game === 'Scissor') {

        if (move === 'Rock') {
            result = 'You Lose';
        }
        else if (move === 'Paper') {
            result = 'You Win';
        }
        else if (move === 'Scissor') {
            result = 'Tie';
        }
    }
    else if (game === 'Paper') {

        if (move === 'Rock') {
            result = 'You Win'
        }
        else if (move === 'Paper') {
            result = 'Tie';
        }
        else if (move === 'Scissor') {
            result = 'You Lose'
        }
    }

    else if (game === 'Rock') {

        if (move === 'Rock') {
            result = 'Tie';
        }
        else if (move === 'Paper') {
            result = 'You Lose';
        }
        else if (move === 'Scissor') {
            result = 'You Win';
        }
    }

    if (result === 'You Win') {
        score.wins += 1;
    }
    else if (result === 'You Lose') {
        score.Lose += 1;
    }
    else if (result === 'Tie') {
        score.Ties += 1;
    }
    //storing the values we have shown on the display , the local storage only allows the string value
    localStorage.setItem('score', JSON.stringify(score));

    scc();

    document.querySelector('.results').innerHTML = ` Result : ${result}`;
    document.querySelector('.move').innerHTML = `User Picks : <img src="Images/${game}-emoji.png" class="move-icon"> Computer Picks :<img src="Images/${move}-emoji.png" class="move-icon">`

}
function scc() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Loses: ${score.Lose}, Ties: ${score.Ties}`;

}


function rpc() {
    let move = '';
    const randomNum = Math.random();

    if (randomNum >= 0 && randomNum < 1 / 3) {
        move = 'Rock';
    }
    else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        move = 'Paper';
    }
    else if (randomNum >= 2 / 3 && randomNum < 1) {
        move = 'Scissor';
    }

    return move;
}
