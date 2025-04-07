import { TaskStateModel } from './TaskStateModel'
export type TaskModel = {
  id: string
  name: string
  duration: number
  startDate: Date
  completeDate: number | null
  interruptDate: number | null
  type: TaskStateModel['config']
}
