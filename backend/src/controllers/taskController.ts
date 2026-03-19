import { Request, Response } from 'express'

let tasks: any[] = []

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks)
}

export const createTask = (req: Request, res: Response) => {
  const task = { id: Date.now(), title: req.body.title }
  tasks.push(task)
  res.status(201).json(task)
}

export const deleteTask = (req: Request, res: Response) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id))
  res.sendStatus(204)
}