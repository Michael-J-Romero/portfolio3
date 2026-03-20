import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import App from './App.tsx';
import { VariantPanelProvider } from './variants';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VariantPanelProvider>
      <App />
    </VariantPanelProvider>
  </StrictMode>,
);
