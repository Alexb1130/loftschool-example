/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function deleteRow(row) {
    row.remove();
}

function isMatching(full, chunk) {
    return new RegExp(chunk, 'i').test(full);
}

function createCookieRow(name, value) {
    const row = document.createElement('tr');
    const cellName = document.createElement('th');
    const cellValue = document.createElement('th');
    const cellBtn = document.createElement('th');
    const deleteBtn = document.createElement('button');

    cellName.textContent = name;
    cellName.dataset.name = name;
    cellValue.textContent = value;
    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click', () => {
        deleteRow(row);
        deleteCookie(name);
    })

    cellBtn.append(deleteBtn);

    row.append(cellName, cellValue, cellBtn);

    listTable.append(row);
}

function renderCookieRow() {
    if (!document.cookie) {
        return;
    }

    document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=');

        createCookieRow(name.trim(), value.trim());
    })
}

renderCookieRow();

filterNameInput.addEventListener('keyup', function() {

    const matchingCookies = document.cookie.split(';').filter(cookie => isMatching(cookie, this.value));
    
    listTable.innerHTML = '';

    matchingCookies.forEach(cookie => {
        const [name, value] = cookie.split('=');

        createCookieRow(name.trim(), value.trim());
    });
    
});

addButton.addEventListener('click', () => {
    if (addNameInput.value && addValueInput.value) {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;

        const matchesName = listTable.querySelector(`th[data-name="${addNameInput.value}"]`);

        if (matchesName) {
            const matchesNameValue = matchesName.nextElementSibling;
            
            matchesNameValue.textContent = addValueInput.value;
        } else {
            createCookieRow(addNameInput.value, addValueInput.value);
        }

        addNameInput.value = '';
        addValueInput.value = '';
        addNameInput.focus();
    } else {
        alert('заполните все поля');
    }
});
