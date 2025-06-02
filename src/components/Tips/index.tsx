import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'

export function Tips() {
  const { state } = useTaskContext()
  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  const tipsForWhenActiveTask = {
    workTime: <span>Fique por {state.config.workTime} minutos focando na tarefa</span>,
    shortBreakTime: <span>Faça uma pausa de {state.config.shortBreakTime} minutos</span>,
    longBreakTime: <span>Faça uma pausa longa</span>,
  }

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime} minutos</span>,
    shortBreakTime: <span>Próximo descanso será de {state.config.shortBreakTime} minutos</span>,
    longBreakTime: <span>Próximo descanso será longa</span>,
  }

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  )
}
