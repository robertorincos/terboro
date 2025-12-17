import './Channels.css'
import reactLogo from './assets/react.svg'

function ChannelCard({ occupied, img, id }) {
  return (
    <div className={`channel-card ${occupied ? 'occupied' : 'blank'}`} data-id={id}>
      {occupied && (
        <img src={img} alt="channel" className="channel-image" />
      )}
      <div className="hover-layer" />
    </div>
  )
}

function Channels() {
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

  return (
    <div className="main-menu">
      <div className="top-section">
        <div className="channels">
          <div className="channels-grid">
            {items.map((it) => (
              <ChannelCard key={it.id} id={it.id} occupied={it.occupied} img={it.img} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
