const input = document.getElementById("taskInput");

function addNewToDo() {
  const inputValue = input.value;

  if (inputValue) {
    const ul = document.getElementById("taskList");

    // добавить новый элемент в список
    // вставляем в конец списка
    ul.insertAdjacentHTML(
      "beforeEnd",
      `
        <li class="task" id="${inputValue}">
            <label>
              <input type="checkbox" />
              ${inputValue}
            </label>
            <button class="button-color" onclick="deleteTodoItem(event)">X</button>
        </li>
      `
    );

    // [{title: 'Медитация', done: true}, {title: 'Чтение книги', done: false}]

    // 1) Получаем список, сохраненный в памяти браузера в виде строки
    const existingList = window.localStorage.getItem("todosList");
    // 2) Преобразуем список в виде строки в массив
    // доп. комментарий JSON.parse - преобразует строку в массив
    const existingListArray = existingList ? JSON.parse(existingList) : [];
    // 3) Создаем объект для сохранения
    const newValue = { title: inputValue, done: false };
    // 3) Формируем новый массив для сохранения в память браузера
    const newArray = [...existingListArray, newValue];
    // 4) Добавляем новое значение в память браузера
    // доп. комментарий JSON.stringify - преобразует массив в строку
    window.localStorage.setItem("todosList", JSON.stringify(newArray));

    input.value = ""; // очистили поле ввода
  }
}

function deleteTodoItem(event) {
  // 1. Смотрим где произошло событие - event.target
  // 2. Так как кнопка вложена в li, то берем event.target.parentElement
  // 3. Удаляем элемент через event.target.parentElement.remove();
  event.target.parentElement.remove();

  // Обновляем элементы в памяти браузера
  // 1) Получаем список, сохраненный в памяти браузера в виде строки
  const existingList = window.localStorage.getItem("todosList");
  // 2) Преобразуем список в виде строки в массив
  // доп. комментарий JSON.parse - преобразует строку в массив
  const existingListArray = existingList ? JSON.parse(existingList) : [];
  const titleToDelete = event.target.parentElement.id;
  // 3) Создаем массив, в котором отбрасываем удаляемый элемент
  const newArray = existingListArray.filter(function (item) {
    return item.title !== titleToDelete;
  });
  // 4) Добавляем новое значение в память браузера
  // доп. комментарий JSON.stringify - преобразует массив в строку
  window.localStorage.setItem("todosList", JSON.stringify(newArray));

  //   [
  //     {
  //         "title": "Медитация",
  //         "done": false
  //     },
  //     {
  //         "title": "Медитация 2",
  //         "done": false
  //     }
  // ]
}

// Проверяем есть ли в памяти список и если да, то рендерим его
// Добавляем обработчик события, который будет срабатывать один раз при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const ul = document.getElementById("taskList");

  // 1) Получаем список, сохраненный в памяти браузера в виде строки
  const existingList = window.localStorage.getItem("todosList");

  if (existingList) {
    // 2) Преобразуем список в виде строки в массив
    // доп. комментарий JSON.parse - преобразует строку в массив
    const existingListArray = JSON.parse(existingList);

    // 3) Отрисовываем каждый элемент, сохраненный в памяти браузера
    // доп. комментарий - item - это объект вида {title: 'Some item', done: false}
    existingListArray.forEach(function (item) {
      ul.insertAdjacentHTML(
        "beforeEnd",
        `
          <li class="task" id="${item.title}">
            <label>
              <input type="checkbox" value="${item.done}" />
              ${item.title}
            </label>
            <button class="button-color" onclick="deleteTodoItem(event)">X</button>
          </li>
        `
      );
    });
  }
});
