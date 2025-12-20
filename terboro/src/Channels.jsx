import { useState, useEffect, useLayoutEffect } from 'react'
import './Channels.css'
import reactLogo from './assets/react.svg'

function ChannelCard({ occupied, img, id, isExpanded, onClick, originRect }) {
  const [style, setStyle] = useState({});

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
      onClick={onClick}
      style={style}
    >
      {occupied && (
        <img src={img} alt="channel" className="channel-image" />
      )}
      <div className="hover-layer" />
      
      {isExpanded && (
        <div className="card-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
                <h3>Module {id}</h3>
                <button className="close-btn" onClick={(e) => {
                    e.stopPropagation();
                    onClick(e); 
                }}>×</button>
            </div>
            <div className="card-body">
                <p>This is the customizable content for module {id}.</p>
                <p>You can add more details, controls, or information here.</p>
            </div>
        </div>
      )}
    </div>
  )
}

function Channels() {
  const [expandedId, setExpandedId] = useState(null);
  const [originRect, setOriginRect] = useState(null);

  const items = [
    { id: 1, occupied: true, img: reactLogo },
    { id: 2, occupied: true, img: reactLogo },
    { id: 3, occupied: false },
    { id: 4, occupied: true, img: reactLogo },
    { id: 5, occupied: false },
    { id: 6, occupied: false },
    { id: 7, occupied: true, img: reactLogo },
    { id: 8, occupied: false },
  ]

  const handleCardClick = (id, e) => {
    if (expandedId === id) {
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {expandedId && <div className="overlay" onClick={() => { setExpandedId(null); setOriginRect(null); }}></div>}
    </div>
  )
}

export default Channels
