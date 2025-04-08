import { useRef } from 'react'
import { DefaultInput } from '../DefaultInput'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { PlayCircleIcon } from 'lucide-react'

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null)

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput labelText='task' id='input' type='text' placeholder='Digite sua tarefa' ref={taskNameInput} />
      </div>
      <div className='formRow'>
        <p>Próximo intervalo é de 25 minutos</p>
      </div>
      <div className='formRow'>
        <Cycles />
      </div>
      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  )
}
