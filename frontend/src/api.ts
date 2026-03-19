import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL}/tasks`


export const getTasks = async () => {
  const res = await axios.get(API)
  return res.data
}

export const addTask = async (title: string) => {
  const res = await axios.post(API, { title })
  return res.data
}

export const removeTask = async (id: string | number) => {
  const res = await axios.delete(`${API}/${id}`)
  return res.data
}