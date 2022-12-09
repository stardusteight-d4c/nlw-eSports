import { Route, Routes } from 'react-router-dom'
import { Main } from './pages/Main'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  )
}
