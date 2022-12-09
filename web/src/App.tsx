import { Route, Routes } from 'react-router-dom'
import { Ad, Main } from './pages'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/ad/:game' element={<Ad />} />
    </Routes>
  )
}
