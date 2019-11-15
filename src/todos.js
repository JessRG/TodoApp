import uuidv4 from "uuid/v4";

// Setup the empty todos array
let todos = [];

const loadTodos = () => {
  const todoJSON = localStorage.getItem("todos");
  try {
    todos = todoJSON ? JSON.parse(todoJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = text => {
  if (typeof text === "string") {
    todos.push({
      id: uuidv4(),
      text,
      completed: false
    });
    saveTodos();
  }
};

// Remove todo from the list
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
};

// Toggle todo completed property
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

loadTodos();
export { getTodos, createTodo, loadTodos, removeTodo, toggleTodo };
