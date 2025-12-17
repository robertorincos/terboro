import './Footer.css'
import imgFooter from './assets/footer-removebg-preview.png'
import Button from './Button.jsx'

function Footer() {

  return (
    <footer className='pesao'>
      <div className='footer-buttons'>
        <Button className='button-left' />
        <Button className='button-right' />
      </div>
      <img src={imgFooter} className="barraFooter" alt="wii footer" />
    </footer>
  )
}

export default Footer
