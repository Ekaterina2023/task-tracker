const input = document.getElementById('taskInput');

function addNewToDo() {
  const inputValue = input.value;

  if (inputValue) {
    const ul = document.getElementById('taskList');

    // добавить новый элемент в список
    // вставляем в конец списка
    ul.insertAdjacentHTML(
      'beforeEnd',
      `
        <li class="task">
            <input type="checkbox" />
            <span>${inputValue}</span>
            <button onclick="deleteTodoItem(event)">X</button>
        </li>
        `
    );

    input.value = ''; // очистили поле ввода
  }
}

function deleteTodoItem(event) {
  // 1. Смотрим где произошло событие - event.target
  // 2. Так как кнопка вложена в li, то берем event.target.parentElement
  // 3. Удаляем элемент через event.target.parentElement.remove();
  event.target.parentElement.remove();
}
