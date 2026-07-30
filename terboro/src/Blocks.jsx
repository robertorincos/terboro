import './Blocks.css'
import { useAudio } from './hooks/useAudio'
import hoverSoundSrc from './assets/sounds/hover.mp3'
import clickSoundSrc from './assets/sounds/click.mp3'
import gameatenImg from './assets/gameaten-icon.png'
import githubImg from './assets/github.jpg'

const BLOCKS = [
  { id: 'gameaten', label: 'GamEaten', img: gameatenImg, href: 'https://gameaten.terboro.com' },
  { id: 'github', label: 'GitHub', img: githubImg, href: 'https://github.com/robertorincos' },
  { id: 'empty', label: '', img: null, href: null },
]

function Block({ label, img, href }) {
  const { play: playHover } = useAudio(hoverSoundSrc, { volume: 0.5 })
  const { play: playClick } = useAudio(clickSoundSrc, { volume: 0.6 })

  if (!href) {
    return (
      <div className="block-tile block-tile--empty" aria-hidden="true">
        <span className="block-label">&nbsp;</span>
        <span className="block-icon" />
      </div>
    )
  }

  const handleClick = (e) => {
    e.preventDefault()
    playClick()
    window.setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer')
    }, 180)
  }

  return (
    <a
      className="block-tile"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playHover}
      onClick={handleClick}
    >
      <span className="block-label">{label}</span>
      <span
        className="block-icon"
        style={{ backgroundImage: `url(${img})` }}
      />
    </a>
  )
}

function Blocks() {
  return (
    <div className="blocks-row">
      {BLOCKS.map((block) => (
        <Block key={block.id} {...block} />
      ))}
    </div>
  )
}

export default Blocks
