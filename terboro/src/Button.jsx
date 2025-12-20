import './Button.css'
import { useAudio } from './hooks/useAudio'
import hoverSoundSrc from './assets/sounds/hover.mp3'

function Button({ className, children, ...props }) {
  const { play: playHover } = useAudio(hoverSoundSrc, { volume: 0.5 });

  return (
    <button 
      type="button" 
      className={`botao ${className || ''}`}
      onMouseEnter={playHover}
      {...props}
    >
      {children || 'Click Me!'}
    </button>
  )
}

export default Button
