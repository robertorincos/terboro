import { useState, useEffect, useLayoutEffect } from 'react'
import './Channels.css'
import reactLogo from './assets/react.svg'
import perfil from './assets/perfil.png'
import github from './assets/github.jpg'
import gameaten from './assets/gameaten.png'
import contato from './assets/contato.png'
import { useAudio } from './hooks/useAudio'
import themeMusic from './assets/sounds/theme.mp3'
import hoverSoundSrc from './assets/sounds/hover.mp3'
import clickSoundSrc from './assets/sounds/click.mp3'
import backSoundSrc from './assets/sounds/back.mp3'

function ChannelCard({ occupied, img, id, isExpanded, onClick, originRect, title, description, link, linkText }) {
  const [style, setStyle] = useState({});
  const { play: playHover } = useAudio(hoverSoundSrc, { volume: 0.5 });
  const { play: playClick } = useAudio(clickSoundSrc, { volume: 0.5 });

  useLayoutEffect(() => {
    if (isExpanded && originRect) {
      // Initial state: position fixed at the origin
      setStyle({
        position: 'fixed',
        top: `${originRect.top}px`,
        left: `${originRect.left}px`,
        width: `${originRect.width}px`,
        height: `${originRect.height}px`,
        transform: 'none',
        zIndex: 1000,
        transition: 'none'
      });

      // Force reflow and animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStyle({
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: 'min(600px, 90vw)',
            height: 'min(500px, 80vh)',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' // Spring-like effect
          });

          // Optional: Clear styles after animation to let CSS take over for responsiveness
          setTimeout(() => {
            setStyle({});
          }, 800);
        });
      });
    } else {
      setStyle({});
    }
  }, [isExpanded, originRect]);

  return (
    <div 
      className={`channel-card ${occupied ? 'occupied' : 'blank'} ${isExpanded ? 'expanded' : ''}`} 
      data-id={id}
      onClick={(e) => {
        playClick();
        onClick(e);
      }}
      onMouseEnter={playHover}
      style={style}
    >
      {occupied && (
        <img src={img} alt="channel" className="channel-image" />
      )}
      <div className="hover-layer" />
      
      {isExpanded && (
        <div className="card-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
                <h3>{title || `Module ${id}`}</h3>
                <button className="close-btn" 
                  onMouseEnter={playHover}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(e); 
                }}>×</button>
            </div>
            <div className="card-body">
                {typeof description === 'string' ? <p>{description || `This is the customizable content for module ${id}.`}</p> : description}
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', textDecoration: 'underline', marginTop: '10px', display: 'block' }}>
                        {linkText || "Visit"}
                    </a>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

function Channels() {
  const [expandedId, setExpandedId] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const { play: playBack } = useAudio(backSoundSrc, { volume: 0.5 });

  useAudio(themeMusic, { volume: 0.3, loop: true, autoplay: true });

  const items = [
    { 
      id: 1, 
      occupied: true, 
      img: github,
      title: "Terboro GitHub",
      description: "My github profile where I share my projects.",
      link: "https://github.com/robertorincos",
      linkText: "Github"
    },
    { 
      id: 2, 
      occupied: true, 
      img: gameaten,
      title: "Gameaten",
      description: "Go to my other website gameaten.terboro.com",
      link: "https://gameaten.terboro.com",
      linkText: "Go to Gameaten"
    },
    { 
      id: 3, 
      occupied: true, 
      img: contato,
      title: "Contact Me",
      description: (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <a href="https://discord.com/users/395051820084625408" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"/>
          </a>
          <a href="https://www.linkedin.com/in/roberto-silveira-519b1a238/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
          </a>
          <a href="https://www.youtube.com/@Terboroo" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"/>
          </a>
          <a href="https://terboroo.itch.io" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/badge/itch.io-FA5C5C?style=for-the-badge&logo=itchdotio&logoColor=white" alt="itch.io"/>
          </a>
        </div>
      ),
    },
    { id: 4, occupied: false },
    { id: 5, occupied: false },
    { id: 6, occupied: false },
    { id: 7, occupied: false },
    { id: 8, occupied: false },
  ]

  const handleCardClick = (id, e) => {
    if (expandedId === id) {
      playBack();
      setExpandedId(null);
      setOriginRect(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setOriginRect(rect);
      setExpandedId(id);
    }
  }

  return (
    <div className="main-menu">
      <div className="top-section">
        <div className="channels">
          <div className="channels-grid">
            {items.map((it) => (
              <div key={it.id} style={{ display: 'contents' }}>
                {expandedId === it.id && <div className="channel-card-placeholder" style={{ aspectRatio: '4/3' }} />}
                <ChannelCard 
                  id={it.id} 
                  occupied={it.occupied} 
                  img={it.img} 
                  isExpanded={expandedId === it.id}
                  onClick={(e) => handleCardClick(it.id, e)}
                  originRect={originRect}
                  title={it.title}
                  description={it.description}
                  link={it.link}
                  linkText={it.linkText}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {expandedId && <div className="overlay" onClick={() => { playBack(); setExpandedId(null); setOriginRect(null); }}></div>}
    </div>
  )
}

export default Channels
