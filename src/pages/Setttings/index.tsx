import { MainTemplate } from '../../templates/MainTemplates'
import { Container } from '../../components/Container'
import { Heading } from '../../components/Heading'
import { DefaultInput } from '../../components/DefaultInput'
import { DefaultButton } from '../../components/DefaultButton'
import { SaveIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { showMessage } from '../../adapters/showMessage'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'

export function Settings() {
  const { state, dispatch } = useTaskContext()
  const workTimeInput = useRef<HTMLInputElement>(null)
  const shortBreakTimeInput = useRef<HTMLInputElement>(null)
  const longBreakTimeInput = useRef<HTMLInputElement>(null)

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    showMessage.dismiss()

    const forErrors = []

    const workTime = Number(workTimeInput.current?.value)
    const shortBreakTime = Number(shortBreakTimeInput.current?.value)
    const longBreakTime = Number(longBreakTimeInput.current?.value)

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      forErrors.push('Digite apenas números para Todos os campos.')
    }

    if (workTime < 1 || workTime > 99) {
      forErrors.push('O tempo de foco deve ser entre 1 e 99 minutos.')
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      forErrors.push('O tempo de descanso curto deve ser entre 1 e 30 minutos.')
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      forErrors.push('O tempo de descanso longo deve ser entre 1 e 60 minutos.')
    }

    if (forErrors.length > 0) {
      forErrors.forEach(error => {
        showMessage.error(error)
      })
      return
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    })
    showMessage.success('Configurações salvas com sucesso!')
  }

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro'
  }, [])

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p>Modifique suas configurações para tempo de foco, descanso e curto e descanso longo.</p>
      </Container>
      <Container>
        <form onSubmit={handleSaveSettings} className='form'>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='foco'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultButton icon={<SaveIcon />} aria-label='Salvar configurações' title='Salvar configurações' />
          </div>
        </form>
      </Container>
    </MainTemplate>
  )
}
