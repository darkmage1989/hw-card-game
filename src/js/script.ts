import '../style/style.css';
import { shuffle } from './units';
window.application = {
    app: document.querySelector('.app'),
    difficult: '',
    firstCard: '',
    blocks: {},
    screens: {},
    renderScreen: function (screenName: string) {
        window.application.screens[screenName]();
    },
    renderBlock: function (blockName: string, container: HTMLElement) {
        window.application.blocks[blockName](container);
    },
    timers: [],
};
// Экран выбора сложности начало.
function difficultBlock(container: HTMLElement) {
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
    window.application.app.classList.add('app-difficult');
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
            window.application.app.textContent = '';
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
}
window.application.screens['start'] = difficultScreen;
// window.application.renderScreen('start');
// Экран выбора сложности конец.
//экран игры
function timerBlock(container: HTMLElement) {
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
        window.application.app.classList.add('app-difficult');
        window.application.renderScreen('start');
    });
    container.appendChild(timer);
    timer.appendChild(timerMinutes);
    timer.appendChild(timerSeconds);
    container.appendChild(restartGame);
}
window.application.blocks['timer-Block'] = timerBlock;
function cardsBlock(container: HTMLElement) {
    const dataRequest = new XMLHttpRequest();
    dataRequest.open('GET', '/images/cards.JSON');
    dataRequest.responseType = 'json';
    dataRequest.send();
    dataRequest.onload = () => {
        const target = dataRequest.response;
        console.log(target);
        const data: string[] = Object.values(target);
        shuffle(data);
        const cardField = [];
        for (let i = 0; i < window.application.difficult * 3; i++) {
            cardField.push(data[i]);
        }
        cardField.forEach((el) => cardField.push(el));
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
        const cards: NodeListOf<HTMLImageElement> =
            document.querySelectorAll('.card');
        cards.forEach((card) => {
            setTimeout(() => {
                card.classList.remove('turn');
                timer();
                card.addEventListener('click', cardClick);
            }, 5300);
            function cardClick(event: MouseEvent) {
                const target = event.target as HTMLImageElement;
                const trigger = target.src;
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
                    target.id === window.application.firstCard
                ) {
                    card.setAttribute('src', card.alt);
                    window.application.firstCard = '';
                    card.removeEventListener('click', cardClick);
                    card.classList.add('open');
                    card.classList.add('turn');
                } else {
                    card.setAttribute('src', card.alt);
                    card.classList.add('turn');
                    setTimeout(() => {
                        //lose
                        window.application.firstCard = '';
                        window.application.renderScreen('result-screen');
                        const image: HTMLImageElement =
                            document.querySelector('.finish__image')!;
                        image.setAttribute('src', '/images/lose.svg');
                        const title: HTMLHeadElement =
                            document.querySelector('.finish__title')!;
                        title.textContent = 'Вы проиграли!';
                    }, 1000);
                }
                const openCards = document.querySelectorAll('.open');
                if (openCards.length === cards.length) {
                    //win
                    setTimeout(() => {
                        window.application.renderScreen('result-screen');
                    }, 1000);
                }
            }
        });
    };
    function timer() {
        const timerMinutes = document.querySelector('.timer__minutes');
        const timerSeconds = document.querySelector('.timer__seconds');
        let seconds: any = '00',
            minutes: any = '00',
            Hour: any = '00';
        window.application.timers.push(
            setInterval(() => {
                seconds = +seconds + 1;
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (seconds === 60) {
                    seconds = '00';
                    minutes = +minutes + 1;
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    if (minutes === 60) {
                        minutes = '00';
                        Hour = +Hour + 1;
                        if (Hour < 10) {
                            Hour = '00' + Hour;
                        }
                    }
                }
                if (timerSeconds && timerSeconds) {
                    (timerSeconds as Element).textContent = String(seconds);
                    (timerMinutes as Element).textContent = String(minutes);
                }
            }, 1000),
        );
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

//Экран результата
function resultBlock(container: HTMLElement) {
    const finishContainer = document.createElement('div');
    finishContainer.classList.add('finish__box');
    const smile = document.createElement('img');
    smile.setAttribute('src', '/images/win.svg');
    smile.classList.add('finish__image');
    const title = document.createElement('h3');
    title.textContent = 'Вы выиграли!';
    title.classList.add('finish__title');
    const finishTime = document.createElement('p');
    finishTime.textContent = 'Затраченное время:';
    finishTime.classList.add('finish__time');
    const timeNumber = document.createElement('p');
    timeNumber.classList.add('finish__time_number');
    const timerMinutes: HTMLDivElement =
        document.querySelector('.timer__minutes')!;
    const timerSeconds: HTMLDivElement =
        document.querySelector('.timer__seconds')!;
    timeNumber.textContent = `${timerMinutes.textContent!}.${timerSeconds.textContent!}`;
    const restartGame = document.createElement('button');
    restartGame.addEventListener('click', () => {
        window.application.app.textContent = '';
        window.application.app.classList.add('app-difficult');
        difficultScreen();
    });
    restartGame.classList.add('finish__restart_game');
    restartGame.textContent = 'Играть снова';
    window.application.timers.forEach(
        (timer: string | number | NodeJS.Timeout | undefined) => {
            clearInterval(timer);
        },
    );
    window.application.timers = [];
    container.appendChild(finishContainer);
    finishContainer.appendChild(smile);
    finishContainer.appendChild(title);
    finishContainer.appendChild(finishTime);
    finishContainer.appendChild(timeNumber);
    finishContainer.appendChild(restartGame);
}
window.application.blocks['result-Block'] = resultBlock;

function resultScreen() {
    const finishBox = document.createElement('div');
    finishBox.classList.add('finish');
    window.application.app.prepend(finishBox);
    window.application.renderBlock('result-Block', finishBox);
}
window.application.screens['result-screen'] = resultScreen;
// window.application.renderScreen('result');

window.application.renderScreen('start');

export { shuffle };
