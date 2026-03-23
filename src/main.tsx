import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import App from './App.tsx';
import allContent from './content/allContent';
import { VariantPanelProvider } from './variants';

document.title = allContent.site.meta.title;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VariantPanelProvider>
      <App />
    </VariantPanelProvider>
  </StrictMode>,
);
