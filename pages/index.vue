<template>
    <div class="w-full min-h-screen bg-slate-100">
        <section class="text-center pt-7">
            <h1 class="text-4xl text-gray-800">
                What's on today's task list?
            </h1>
        </section>
        <div class="w-10/12 max-w-lg mx-auto flex items-center justify-center mt-7 bg-white shadow p-5 rounded">
            <form @submit.prevent="addTodo" action="">
                <input v-model="newTodo" type="text" placeholder="Add a task"
                    class="py-2 px-4 border border-blue-200 focus:outline-blue-300 rounded">
                <button type="submit"
                    class="text-gray-900 bg-white hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 ml-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none active:ring-4 active:ring-gray-300 dark:active:ring-gray-400 transition-all duration-75 ease-in-out">
                    Add Task
                </button>
                <button @click="generateTask" class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 ml-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none active:ring-4 active:ring-green-300 dark:active:ring-green-800 transition-all duration-75 ease-in-out">Recommend Task</button>
            </form>

        </div>
        <h1 class="flex items-center justify-center mt-4" v-if="todos.length === 0">You have not added any activity to your bucket list yet</h1>
        <div class="flex items-center justify-center w-f max-w-lg mx-auto">
            <!-- <h1>{{ todos }}</h1> -->
            <ul class="w-full">
                <li v-for="todo in todos" :key="todo.id" class="mt-4 bg-white p-4 flex items-center justify-between">
                    <div class="flex flex-col">
                        <div class="flex items-center">
                            <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" class="mr-2 " />
                            <span :class="{ 'line-through': todo.completed }">{{ todo.title }}</span>
                        </div>
                        <span class="text-gray-500 text-xs mt-1">Created at: {{ formatDate(todo.createdAt) }}</span>
                    </div>
                    <button @click="deleteTodo(todo.id)"
                        class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useTodoStore } from '~/stores/todoStore'
import { ref, onMounted } from 'vue'
import moment from 'moment'

const todoStore = useTodoStore()
const newTodo = ref('')

onMounted(async () => {
  const { data: fetchedTodos } = await useFetch('/api/todos')
  todoStore.setTodos(fetchedTodos.value || [])  
})

async function addTodo() {
  if (newTodo.value.trim()) {
    const todo = await $fetch('/api/todos', {
      method: 'POST',
      body: { title: newTodo.value }
    })
    todoStore.addTodo(todo)
    newTodo.value = ''
  }
}

async function updateTodo(todo) {
  await $fetch('/api/todos', {
    method: 'PUT',
    body: todo
  })
  todoStore.updateTodo(todo)
}

async function deleteTodo(id) {
  await $fetch('/api/todos', {
    method: 'DELETE',
    body: { id }
  })
  todoStore.deleteTodo(id)
}

function formatDate(dateString) {
  return moment(dateString).format('D MMMM YYYY')
}

const generateTask = async () => {
  await useFetch('/api/chatgpt', { method: 'POST' })
}
</script>