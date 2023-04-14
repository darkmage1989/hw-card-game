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
    
}
window.application.screens['start'] = difficultScreen;
// window.application.renderScreen('start');