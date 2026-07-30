import './Channels.css'
import Face from './Face.jsx'
import Blocks from './Blocks.jsx'
import { useAudio } from './hooks/useAudio'
import themeMusic from './assets/sounds/theme.mp3'

function Channels() {
  useAudio(themeMusic, { volume: 0.3, loop: true, autoplay: true })

  return (
    <div className="main-menu">
      <div className="top-section">
        <Face />
      </div>
      <Blocks />
    </div>
  )
}

export default Channels
