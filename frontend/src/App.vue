<template>
  <div style="max-width: 500px; margin: 40px auto; font-family: Arial; text-align: center;">
    <h1>📝 Task Manager</h1>

    <div style="margin-bottom: 20px;">
      <input v-model="title" placeholder="Digite uma tarefa"
        style="padding: 8px; width: 70%;" />
      <button @click="addTask"
        style="padding: 8px 12px; margin-left: 5px; cursor: pointer;">
        Adicionar
      </button>
    </div>

    <ul style="list-style: none; padding: 0;">
      <li v-for="task in tasks" :key="task.id"
        style="display: flex; justify-content: space-between; margin-bottom: 10px; background: #f4f4f4; padding: 10px; border-radius: 5px;">
        {{ task.title }}
        <button @click="removeTask(task.id)" style="cursor: pointer;">
          ❌
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const title = ref('')

const API = 'http://localhost:3000/tasks'

const loadTasks = async () => {
  const res = await axios.get(API)
  tasks.value = res.data
}

const addTask = async () => {
  if (!title.value) return
  await axios.post(API, { title: title.value })
  title.value = ''
  loadTasks()
}

const removeTask = async (id) => {
  await axios.delete(`${API}/${id}`)
  loadTasks()
}

onMounted(loadTasks)
</script>