import { TaskModel } from '../models/TaskModel'

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completeDate) return 'completada'
  if (task.interruptDate) return 'interrompida'
  if (task.id === activeTask?.id) return 'Em Progresso'
  return 'Abandonada'
}
