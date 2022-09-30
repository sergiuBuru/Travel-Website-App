import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MyNav from './components/MyNav'
import Home from './pages/Home'
import Vacations from './pages/Vacations'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNav />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              // element={<Home />}
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
