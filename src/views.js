import { getTodos, removeTodo, toggleTodo } from "./todos";
import { getFilters } from "./filters";

// renderTodos
// Arguments: none
// Return value: none
// Render application todos based on filters
const renderTodos = () => {
  const todoEl = document.querySelector("#todo-list");
  const { searchText, hideCompleted } = getFilters();
  const filteredTodos = getTodos().filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompleteMatch = !hideCompleted || !todo.completed;
    return searchTextMatch && hideCompleteMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const msg = document.createElement("p");
    msg.classList.add("empty-message");
    msg.textContent = "There are no to-dos to show";
    todoEl.appendChild(msg);
  }
};

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
// Get the DOM elements for an individual todo
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const container = document.createElement("div");
  const elem = document.createElement("span");
  const checkbox = document.createElement("input");
  const rmButton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  container.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text
  elem.textContent = todo.text;
  container.appendChild(elem);

  // Setup container
  todoEl.classList.add("list-item");
  container.classList.add("list-item__container");
  todoEl.appendChild(container);

  // Setup the remove button
  rmButton.textContent = "remove";
  rmButton.classList.add("button", "button--text"); // set classes for CSS
  todoEl.appendChild(rmButton);
  rmButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "todo" : "todos";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} ${plural} left`;
  return summary;
};

export { renderTodos as default };
