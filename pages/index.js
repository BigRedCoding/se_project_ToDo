import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  todoTemplate,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addToDoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addToDoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addToDoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplate, handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed === true) {
    todoCounter.updateCompleted(false);
  } else {
  }
  todoCounter.updateTotal(false);
}

const addToDoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;
    const parsedDate = new Date(date);
    parsedDate.setMinutes(
      parsedDate.getMinutes() + parsedDate.getTimezoneOffset()
    );

    const id = uuidv4();
    const values = { name, date: parsedDate, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
    addToDoPopup.close();
  },
});

addToDoPopup.setEventListeners();

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addToDoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
