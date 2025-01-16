import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Home from './pages/Home/Home';
import ClientPage from './pages/ClientPage/ClientPage';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ClientPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;