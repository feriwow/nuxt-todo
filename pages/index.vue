<template>
    <div class="w-full min-h-screen bg-slate-100">
        <section class="text-center pt-7">
            <h1 class="text-4xl text-gray-800">
                What's on today's task list?
            </h1>
        </section>
        <div class="w-10/12 max-w-lg mx-auto mt-7 bg-white shadow p-5 rounded">
            <form @submit.prevent="addTodo" class="flex flex-wrap items-center justify-center gap-2">
                <input v-model="newTodo" type="text" placeholder="Add a task"
                    class="flex-grow py-2 px-4 border border-blue-200 focus:outline-blue-300 rounded">
                <div class="flex gap-2">
                    <button type="submit"
                        class="text-gray-900 bg-white hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none active:ring-4 active:ring-gray-300 dark:active:ring-gray-400 transition-all duration-75 ease-in-out">
                        Add Task
                    </button>
                    <button @click.prevent="generateTask" :disabled="isGenerating"
                        class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none active:ring-4 active:ring-green-300 dark:active:ring-green-800 transition-all duration-75 ease-in-out flex items-center justify-center min-w-[140px]">
                        <span v-if="!isGenerating">Recommend Task</span>
                        <span v-else class="flex items-center">
                            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Loading...
                        </span>
                    </button>
                </div>
            </form>
        </div>
        <h1 class="flex items-center justify-center mt-4" v-if="todos.length === 0">You have not added any activity to
            your bucket list yet</h1>
        <div class="flex items-center justify-center w-f max-w-lg mx-auto">
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
import { ref, onMounted, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import moment from 'moment'

const todoStore = useTodoStore()
const newTodo = ref('')
const isGenerating = ref(false)

const todos = computed(() => todoStore.todos)

onMounted(() => {
    todoStore.fetchTodos()
})

async function addTodo() {
    if (newTodo.value.trim()) {
        await todoStore.addTodo({ title: newTodo.value })
        newTodo.value = ''
    }
}

async function updateTodo(todo) {
    await todoStore.updateTodo(todo)
}

async function deleteTodo(id) {
    await todoStore.deleteTodo(id)
}

function formatDate(dateString) {
    return moment(dateString).format('D MMMM YYYY')
}

const generateTask = async () => {
    if (isGenerating.value) return
    isGenerating.value = true
    try {
        await $fetch('/api/chatgpt', { method: 'POST' })
        await todoStore.fetchTodos()
    } catch (error) {
        console.error('Error generating task:', error)
    } finally {
        isGenerating.value = false
    }
}
</script>