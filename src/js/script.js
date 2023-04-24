import '../style/style.css';
import '../js/timer.js';

window.application = {
    app: document.querySelector('.app'),
    difficult: '',
    firstCard: '',
    blocks: {},
    screens: {},
    renderScreen: function (screenName) {
        const app = document.querySelector('.app');
        app.textContent = '';
        window.application.screens[screenName]();
    },
    renderBlock: function (blockName, container) {
        window.application.blocks[blockName](container);
    },
    timers: [],
};

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
    timerMinutes.textContent = '00';
    const timerSeconds = document.createElement('div');
    timerSeconds.classList.add('timer__seconds', 'timer__time');
    timerSeconds.textContent = '00';
    const restartGame = document.createElement('button');
    restartGame.classList.add('header__restart');
    restartGame.textContent = 'Начать заново';
    restartGame.addEventListener('click', () => {
        window.application.app.textContent = '';
        gameScreen();
    });
    container.appendChild(timer);
    timer.appendChild(timerMinutes);
    timer.appendChild(timerSeconds);
    container.appendChild(restartGame);
}
window.application.blocks['timer-Block'] = timerBlock;

function cardsBlock(container) {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    const data = new XMLHttpRequest();
    data.open('GET', '/images/cards.JSON');
    data.responseType = 'json';
    data.send();
    data.onload = (event) => {
        const data = Object.values(event.target.response);
        shuffle(data);
        let cardField = [];
        for (let i = 0; i < window.application.difficult * 3; i++) {
            cardField.push(data[i]);
        }

        cardField.forEach((el) => {
            cardField.push(el);
        });
        shuffle(cardField);
        for (let i = 0; i < cardField.length; i++) {
            const id = cardField[i].replace('/images/', '');
            const card = document.createElement('img');
            card.classList.add('card');
            card.classList.add('turn');
            setTimeout(() => {
                card.classList.remove('turn');
            }, 1000);
            card.setAttribute('src', cardField[i]);
            card.setAttribute('id', id);
            card.setAttribute('alt', cardField[i]);
            container.appendChild(card);
            setTimeout(() => {
                card.classList.add('turn');
                card.setAttribute('src', '/images/hide.svg');
            }, 5000);
        }
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            setTimeout(() => {
                card.classList.remove('turn');
                timer();
                card.addEventListener('click', cardClick);
            }, 5300);
            function cardClick(event) {
                const trigger = event.target.src;
                if (
                    trigger.includes('hide.svg') &&
                    window.application.firstCard === ''
                ) {
                    window.application.firstCard = card.id;
                    card.setAttribute('src', card.alt);
                    card.removeEventListener('click', cardClick);
                    card.classList.add('open');
                    card.classList.add('turn');
                } else if (
                    trigger.includes('hide.svg') &&
                    event.target.id === window.application.firstCard
                ) {
                    card.setAttribute('src', card.alt);
                    window.application.firstCard = '';
                    card.removeEventListener('click', cardClick);
                    card.classList.add('open');
                    card.classList.add('turn');
                } else {
                    alert('Вы проиграли(');
                    window.application.firstCard = '';
                    window.application.app.textContent = '';
                    gameScreen();
                }
                const openCards = document.querySelectorAll('.open');
                if (openCards.length === cards.length) {
                    setTimeout(() => {
                        alert('Ну я считаю это победа!');
                        window.application.app.textContent = '';
                        gameScreen();
                    }, 1000);
                }
            }
        });
    };
    function timer() {
        const mins = document.querySelector('.timer__minutes');
        const secs = document.querySelector('.timer__seconds');
        let S = '00',
            M = '00',
            H = '00';

        setInterval(function () {
            //Плюсик перед строкой преобразует его в число
            S = +S + 1;
            //Если результат меньше 10, прибавляем впереди строку '0'
            if (S < 10) {
                S = '0' + S;
            }
            if (S === 60) {
                S = '00';
                //Как только секунд стало 60, добавляем +1 к минутам
                M = +M + 1;
                //Дальше то же самое, что и для секунд
                if (M < 10) {
                    M = '0' + M;
                }
                if (M === 60) {
                    //Как только минут стало 60, добавляем +1 к часам.
                    M = '00';
                    H = +H + 1;
                    if (H < 10) {
                        H = '0' + H;
                    }
                }
            }
            secs.textContent = S;
            mins.textContent = M;
            //Тикает всё через одну функцию, раз в секунду.
        }, 1000);
    }
}
window.application.blocks['card-block'] = cardsBlock;

function gameScreen() {
    const header = document.createElement('header');
    header.classList.add('header', 'center');
    const cardField = document.createElement('section');
    cardField.classList.add('cards');
    window.application.renderBlock('timer-Block', header);
    window.application.app.appendChild(header);
    window.application.app.appendChild(cardField);
    window.application.renderBlock('card-block', cardField);
}
window.application.screens['game'] = gameScreen;
// window.application.renderScreen('game');
//конец экрана игры;
