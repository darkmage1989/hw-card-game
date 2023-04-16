// Экран выбора сложности начало.
function difficultBlock(container) {
    const difficultBox = document.createElement('div');
    difficultBox.classList.add('difficult__box')
    const difficultEasy = document.createElement('button');
    difficultEasy.classList.add('difficult__easy__btn', 'difficult__btn');
    difficultEasy.textContent = '1';
    const difficultMedium = document.createElement('button');
    difficultMedium.classList.add('difficult__medium__btn', 'difficult__btn');
    difficultMedium.textContent = '2';
    const difficultHard = document.createElement('button');
    difficultHard.classList.add('difficult__hard__btn', 'difficult__btn');
    difficultHard.textContent = '3';
    container.appendChild (difficultBox);
    difficultBox.appendChild(difficultEasy);
    difficultBox.appendChild(difficultMedium);
    difficultBox.appendChild(difficultHard);
}
window.application.blocks['difficult-Block'] = difficultBlock;
function difficultScreen() {
    const startTitle = document.createElement('h1');
    const startBox = document.createElement ('section');
    startBox.classList.add ('start__box')
    startTitle.classList.add('start__box__title');
    startTitle.textContent = 'Выбери сложность';
    const startBtn = document.createElement('button');
    startBtn.classList.add('start__box__btn');
    startBtn.textContent = 'Старт';
    startBox.appendChild(startTitle);
    window.application.app.appendChild(startBox);
    window.application.renderBlock('difficult-Block', startBox);
    startBox.appendChild(startBtn);
    startBtn.addEventListener ('click', ()=> {
        if (window.application.difficult >= 1 && window.application.difficult <=3) {
            window.application.renderScreen('game');
        } else {
            const errorText = document.createElement('h3');
            errorText.style.color = 'red';
            errorText.textContent = 'Выберите сложность';
            startBox.appendChild(errorText);
            window.application.timers.push(setInterval(() => {
                errorText.remove();
            },2000))
        }
    })
    
}
window.application.screens['start'] = difficultScreen;
// window.application.renderScreen('start');
// Экран выбора сложности конец.

window.addEventListener("DOMContentLoaded", () => {
    window.application.renderScreen('start');
    const difficultButtons = document.querySelectorAll ('.difficult__btn');
difficultButtons.forEach(difficultButton => {
    difficultButton.addEventListener ('click', ()=> {
        difficultButtons.forEach(difficultButton =>{
            difficultButton.classList.remove ('active_btn');
        })
        window.application.difficult = difficultButton.textContent;
        difficultButton.classList.add ('active_btn');
    })
});
});
function gameScreen() {
    const gameBox = document.createElement ('section');
    gameBox.classList.add ('game__box')
    const gameTitle = document.createElement ('h1');
    gameTitle.textContent = 'work in progress';
    window.application.app.appendChild (gameTitle);
    window.application.app.appendChild(gameBox);
}
window.application.screens['game'] = gameScreen;
// window.application.renderScreen('game');
