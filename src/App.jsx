import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';

const App = () => {
  return (
    
      <>
        <Home>
          <Routes>
            {/* <Route path="/" element={<Main  />} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/main"  element={<Main />} />
          </Routes>
        </Home>
      </>
    
  )
}

export default App
