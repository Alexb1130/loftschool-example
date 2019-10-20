/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

// function getRandomInt (min, max) {
//     return parseInt(min + Math.random() * max - min);
// }

function getRandomInt (min, max) {
    const length = max - min + 1;

    return parseInt(Math.random() * length) + min;
}

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div');
    const minSize = 20;
    const maxSize = 200;
    const maxColor = 0xffffff;

    div.classList.add('draggable-div');
    div.style.position = 'absolute';
    div.style.top = getRandomInt(0, window.innerHeight) + 'px';
    div.style.left = getRandomInt(0, window.innerWidth) + 'px';
    div.style.width = getRandomInt(minSize, maxSize) + 'px';
    div.style.height = getRandomInt(minSize, maxSize) + 'px';
    div.style.backgroundColor = '#' + getRandomInt(0, maxColor).toString(16);

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let startCoords = {};

    target.addEventListener('mousedown', e => {
        e.preventDefault();

        startCoords = {
            x: e.clientX,
            y: e.clientY    
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    })

    const onMouseMove = moveE => {
        moveE.preventDefault();

        const shift = {
            x: startCoords.x - moveE.clientX,
            y: startCoords.y - moveE.clientY
        }
        
        startCoords = {
            x: moveE.clientX,
            y: moveE.clientY
        }

        target.style.top = target.offsetTop - shift.y + 'px';
        target.style.left = target.offsetLeft - shift.x + 'px';
    }

    const onMouseUp = upE => {
        upE.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
