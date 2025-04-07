import { DefaultInput } from '../DefaultInput'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { PlayCircleIcon } from 'lucide-react'
import { useTaskContext } from '../../contexts/TaskContext'

export function MainForm() {
  const { setState } = useTaskContext()

  function handleClick() {
    setState(prevState => {
      return {
        ...prevState,
        formattedSecondsRemaining: '21:00',
      }
    })
  }

  return (
    <form action='' className='form'>
      <button type='button' className='formButton' onClick={handleClick}>
        Clicar
      </button>
      <div className='formRow'>
        <DefaultInput labelText='task' id='input' type='text' placeholder='Digite sua tarefa' />
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
