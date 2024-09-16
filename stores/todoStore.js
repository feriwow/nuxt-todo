import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])  // Initialize with an empty array

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const { data } = await $fetch('/api/todos')
      todos.value = data || []
      
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  // Add a new todo
  const addTodo = async (newTodo) => {
    try {
      const todo = await $fetch('/api/todos', {
        method: 'POST',
        body: newTodo,
      })
      todos.value.push(todo)  // Add the newly created todo to the list
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // Update an existing todo
  const updateTodo = async (todo) => {
    try {
      const updatedTodo = await $fetch('/api/todos', {
        method: 'PUT',
        body: todo,
      })
      const index = todos.value.findIndex((t) => t.id === updatedTodo.id)
      if (index !== -1) {
        todos.value[index] = updatedTodo  // Update the todo in the list
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await $fetch('/api/todos', {
        method: 'DELETE',
        body: { id },
      })
      todos.value = todos.value.filter((todo) => todo.id !== id)  // Remove from list
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return {
    todos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  }
})
