
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ServiceDetail from './pages/ServiceDetail';
import ServicesPage from './pages/Services';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:serviceId" element={<ServiceDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
