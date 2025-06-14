import { MainTemplate } from '../../templates/MainTemplates'
import { Container } from '../../components/Container'
import { Heading } from '../../components/Heading'
import { DefaultButton } from '../../components/DefaultButton'
import { TrashIcon } from 'lucide-react'

import styles from './styles.module.css'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { formatDate } from '../../utils/formatDate'
import { getTaskStatus } from '../../utils/getTaskStatus'
import { sortTasks, SortTasksOptions } from '../../utils/sortTasks'
import { useEffect, useState } from 'react'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'
import { showMessage } from '../../adapters/showMessage'

export function History() {
  const { state, dispatch } = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false)
  const hasTasks = state.tasks.length > 0

  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    }
  })

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }))
  }, [state.tasks])

  useEffect(() => {
    if (!confirmClearHistory) return

    setConfirmClearHistory(false)
    dispatch({ type: TaskActionTypes.RESET_STATE })
  }, [confirmClearHistory, dispatch])

  useEffect(() => {
    return () => {
      document.title = 'Histórico - Chronos Pomodoro'
      showMessage.dismiss()
    }
  }, [])

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc'

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: sortTasksOptions.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    })
  }

  function handleClearHistory() {
    showMessage.dismiss()
    showMessage.confirm('Você tem certeza que deseja apagar todo o histórico?', confirmation => {
      setConfirmClearHistory(confirmation)
    })
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>History</span>
            {hasTasks && (
              <span className={styles.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color='red'
                  aria-label='Apagar todo o histórico'
                  title='Apagar histórico'
                  onClick={handleClearHistory}
                  style={{ minWidth: '4rem' }}
                />
              </span>
            )}
          </div>
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>
                    Tarefa ↕
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>
                    Duração ↕
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso Curto',
                    longBreakTime: 'Descanso Longo',
                  }

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Ainda não existem tarefas criadas.</p>}
      </Container>
    </MainTemplate>
  )
}
