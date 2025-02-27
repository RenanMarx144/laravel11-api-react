import './App.css'
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Suggestion from './pages/Suggestion';
import LogoutButton from './components/LogoutButton';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';

function App() {

  return (
    <div>
      <main className="p-4">
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/suggestions" element={<Suggestion />} />
          </Routes>
        </AuthProvider>
      </main>

    </div>
  )
}

export default App
