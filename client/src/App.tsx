import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import ScrollToTop from './routes/ScrollToTop';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
