import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MyNav from './components/MyNav'
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/Home'
import Vacations from './pages/Vacations'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VacationForm from './pages/VacationForm'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <MyNav />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/vacations"
              element={user ? <Vacations /> : <Login />}
            />
            <Route
              path="/add-vacation"
              element={user ? <VacationForm /> : <Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
