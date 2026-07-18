import './App.css'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {

  return (
    <div className='w-full h-screen bg-zinc-500'>
      <Navbar/>
      <Dashboard/>
    </div>
  )
}

export default App
