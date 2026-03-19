import { Request, Response } from 'express'

type Task = {
  id: number
  title: string
}

let tasks: Task[] = []

// 🔹 Listar tarefas (FILTRANDO inválidas)
export const getTasks = (req: Request, res: Response) => {
  const validTasks = tasks.filter(task => task.title && task.title.trim())
  res.json(validTasks)
}

// 🔹 Criar tarefa (COM VALIDAÇÃO)
export const createTask = (req: Request, res: Response) => {
  const { title } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Título é obrigatório' })
  }

  const newTask: Task = {
    id: Date.now(),
    title: title.trim()
  }

  tasks.push(newTask)

  res.status(201).json(newTask)
}

// 🔹 Deletar tarefa (COM VALIDAÇÃO)
export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const exists = tasks.some(task => task.id === id)

  if (!exists) {
    return res.status(404).json({ error: 'Task não encontrada' })
  }

  tasks = tasks.filter(task => task.id !== id)

  res.sendStatus(204)
}