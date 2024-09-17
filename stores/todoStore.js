import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        const response = await fetch('/api/todos')
        this.todos = await response.json()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addTodo(todo) {
      this.loading = true
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          body: JSON.stringify(todo),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const newTodo = await response.json()
        this.todos.push(newTodo)
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateTodo(todo) {
      this.loading = true
      try {
        const response = await fetch('/api/todos', {
          method: 'PUT',
          body: JSON.stringify(todo),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const updatedTodo = await response.json()
        const index = this.todos.findIndex(t => t.id === updatedTodo.id)
        if (index !== -1) {
          this.todos[index] = updatedTodo
        }
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteTodo(id) {
      this.loading = true
      try {
        await fetch('/api/todos', {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.todos = this.todos.filter(todo => todo.id !== id)
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})