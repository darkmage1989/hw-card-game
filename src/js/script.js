// Экран выбора сложности начало.
function difficultBlock(container) {
    const difficultBox = document.createElement('div');
    difficultBox.classList.add('difficult');
    const difficultEasy = document.createElement('button');
    difficultEasy.classList.add('difficult__easy', 'difficult__btn');
    difficultEasy.textContent = '1';
    const difficultMedium = document.createElement('button');
    difficultMedium.classList.add('difficult__medium', 'difficult__btn');
    difficultMedium.textContent = '2';
    const difficultHard = document.createElement('button');
    difficultHard.classList.add('difficult__hard', 'difficult__btn');
    difficultHard.textContent = '3';
    container.appendChild(difficultBox);
    difficultBox.appendChild(difficultEasy);
    difficultBox.appendChild(difficultMedium);
    difficultBox.appendChild(difficultHard);
}
window.application.blocks['difficult-Block'] = difficultBlock;
function difficultScreen() {
    const startTitle = document.createElement('h1');
    const startBox = document.createElement('section');
    startBox.classList.add('start');
    startTitle.classList.add('start__title');
    startTitle.textContent = 'Выбери сложность';
    const startBtn = document.createElement('button');
    startBtn.classList.add('start__btn');
    startBtn.textContent = 'Старт';
    startBox.appendChild(startTitle);
    window.application.app.appendChild(startBox);
    window.application.renderBlock('difficult-Block', startBox);
    startBox.appendChild(startBtn);
    startBtn.addEventListener('click', () => {
        if (
            window.application.difficult >= 1 &&
            window.application.difficult <= 3
        ) {
            window.application.renderScreen('game');
            window.application.app.classList.remove('app-difficult');
        } else {
            const errorText = document.createElement('h3');
            errorText.style.color = 'red';
            errorText.textContent = 'Выберите сложность';
            startBox.appendChild(errorText);
            window.application.timers.push(
                setInterval(() => {
                    errorText.remove();
                }, 2000),
            );
        }
    });
}
window.application.screens['start'] = difficultScreen;
// window.application.renderScreen('start');
// Экран выбора сложности конец.

window.addEventListener('DOMContentLoaded', () => {
    window.application.app.classList.add('app-difficult');
    window.application.renderScreen('start');
    const difficultButtons = document.querySelectorAll('.difficult__btn');
    difficultButtons.forEach((difficultButton) => {
        difficultButton.addEventListener('click', () => {
            difficultButtons.forEach((difficultButton) => {
                difficultButton.classList.remove('active__btn');
            });
            window.application.difficult = difficultButton.textContent;
            difficultButton.classList.add('active__btn');
        });
    });
});
//экран игры

function timerBlock(container) {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    const timerMinutes = document.createElement('div');
    timerMinutes.classList.add('timer__minutes', 'timer__time');
    timerMinutes.textContent = '30';
    const timerSeconds = document.createElement('div');
    timerSeconds.classList.add('timer__seconds', 'timer__time');
    timerSeconds.textContent = '30';
    const restartGame = document.createElement('button');
    restartGame.classList.add('header__restart');
    restartGame.textContent = 'Начать заново';
    container.appendChild(timer);
    timer.appendChild(timerMinutes);
    timer.appendChild(timerSeconds);
    container.appendChild(restartGame);
}
window.application.blocks['timer-Block'] = timerBlock;

function cardsBlock(container) {
    const data = new XMLHttpRequest();
    data.open('GET', './style/face/cards.JSON');
    data.responseType = 'json';
    data.send();
    data.onload = (event) => {
        const data = Object.values(event.target.response);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', './style/face/hide.svg');
            card.classList.add('cards_card');
            container.appendChild(card);
            card.addEventListener('click', (event) => {
                card.setAttribute('src', data[i]);
            });
        }
    };
}
window.application.blocks['card-block'] = cardsBlock;

function gameScreen() {
    const header = document.createElement('header');
    header.classList.add('header', 'center');
    const cardField = document.createElement('section');
    cardField.classList.add('cards', 'center');
    window.application.renderBlock('timer-Block', header);
    window.application.app.appendChild(header);
    window.application.app.appendChild(cardField);
    window.application.renderBlock('card-block', cardField);
}
window.application.screens['game'] = gameScreen;
// window.application.renderScreen('game');
//конец экрана игры;
