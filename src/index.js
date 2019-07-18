// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --
const searchText = document.querySelector('#search-text')
const checkBox = document.querySelector('#hide-completed')
const newTodo = document.querySelector('#new-todo')

import renderTodos from './views'
import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters';

// Render initial todos
renderTodos()

// Set up search text handler
searchText.addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
checkBox.addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
newTodo.addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim() // omits leading and following spaces
    e.preventDefault()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ''
        document.getElementById('focus').focus()
    }
})

// Bonus: Add a watcher for local storage
window.addEventListener('storage', (e) => {
    if(e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})
