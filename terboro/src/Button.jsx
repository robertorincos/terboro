import './Button.css'

function Button({ className }) {

  return (
    <button type="button" className={`botao ${className || ''}`}>Click Me!</button>
  )
}

export default Button
