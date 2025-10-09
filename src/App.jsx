import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <MainRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;