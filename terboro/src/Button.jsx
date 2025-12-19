import './Button.css'

function Button({ className, children }) {

  return (
    <button type="button" className={`botao ${className || ''}`}>
      {children || 'Click Me!'}
    </button>
  )
}

export default Button
