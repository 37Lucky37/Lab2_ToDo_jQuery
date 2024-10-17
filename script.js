const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const $list = $('#todo-list');
const $itemCountSpan = $('#item-count');
const $uncheckedCountSpan = $('#unchecked-count');

let totalTodos = 0;
let uncheckedTodos = 0;

function newTodo() {
  const todoTextValue = prompt('Введіть назву нового завдання:');
  if (!todoTextValue) {
    return;
  }

  const $todoItem = $('<li>').addClass(classNames.TODO_ITEM);

  const $checkbox = $('<input>').attr('type', 'checkbox').addClass(classNames.TODO_CHECKBOX);
  $checkbox.on('change', updateUncheckedCount); 

  const $todoText = $('<span>').addClass(classNames.TODO_TEXT).text(todoTextValue);

  const $deleteButton = $('<button>').addClass(classNames.TODO_DELETE).text('Delete');
  $deleteButton.on('click', function() {
    deleteTodo($todoItem);
  });

  $todoItem.append($checkbox, $todoText, $deleteButton);

  $list.append($todoItem);

  totalTodos++;
  uncheckedTodos++;
  updateCounters();
}

function deleteTodo($todoItem) {
  const isUnchecked = !$todoItem.find(`.${classNames.TODO_CHECKBOX}`).prop('checked');
  if (isUnchecked) {
    uncheckedTodos--;
  }
  $todoItem.remove();
  
  totalTodos--;
  updateCounters();
}

function updateCounters() {
  $itemCountSpan.text(totalTodos);
  $uncheckedCountSpan.text(uncheckedTodos);
}

function updateUncheckedCount() {
  if ($(this).is(':checked')) {
    uncheckedTodos--;
  } else {
    uncheckedTodos++;
  }
  updateCounters();
}
