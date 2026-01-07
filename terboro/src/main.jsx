import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Channels from './Channels.jsx'
import Footer from './Footer.jsx'
import CustomCursor from './CustomCursor.jsx'
import { SoundProvider } from './context/SoundContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
        {/* <App /> */}
        <CustomCursor />
        <Channels />
        <Footer />
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>,
)
