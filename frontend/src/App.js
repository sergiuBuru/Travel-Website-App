import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MyNav from './components/MyNav'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Vacations from './pages/Vacations'

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
              // element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              // element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/vacations"
              // element={<Vacations />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
