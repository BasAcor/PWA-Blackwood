import { Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import CharacterSelectPage from './pages/CharacterSelectPage'
import ControllerPage from './pages/ControllerPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/select" element={<CharacterSelectPage />} />
      <Route path="/controller" element={<ControllerPage />} />
    </Routes>
  )
}