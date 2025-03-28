import './styles/theme.css'
import './styles/global.css'
import { Heading } from './components/Heading'
import { TimerIcon } from 'lucide-react'

export function App() {
  return (
    <>
      <Heading>
        Olá Mundo 1
        <button>
          <TimerIcon />
        </button>
      </Heading>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolore, voluptates eius consequuntur cupiditate earum
        quod perspiciatis suscipit, nisi error numquam doloremque ea minima. Molestiae eos beatae ea quam voluptatum.
      </p>
    </>
  )
}
