import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])  // Initial empty array for todos

  const setTodos = (newTodos) => {
    todos.value = newTodos
  }

  const addTodo = (todo) => {
    todos.value.push(todo)
  }

  const updateTodo = (updatedTodo) => {
    const index = todos.value.findIndex((t) => t.id === updatedTodo.id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
    }
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  }
})