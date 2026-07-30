import './Channels.css'
import Face from './Face.jsx'
import { useAudio } from './hooks/useAudio'
import themeMusic from './assets/sounds/theme.mp3'

function Channels() {
  useAudio(themeMusic, { volume: 0.3, loop: true, autoplay: true })

  return (
    <div className="main-menu">
      <div className="top-section">
        <Face />
      </div>
    </div>
  )
}

export default Channels
