import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import App from './App.tsx';
import allContent from './content/allContent';
import { VariantPanelProvider } from './variants';

const siteMeta = allContent.site?.meta ?? {};

if (siteMeta.title) {
  document.title = siteMeta.title;
}

const setMetaTag = (attribute: 'name' | 'property', key: string, value?: string) => {
  if (!value) {
    return;
  }

  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', value);
};

setMetaTag('name', 'description', siteMeta.description);
setMetaTag('name', 'author', siteMeta.author);
setMetaTag('property', 'og:title', siteMeta.title);
setMetaTag('property', 'og:description', siteMeta.description);
setMetaTag('name', 'twitter:title', siteMeta.title);
setMetaTag('name', 'twitter:description', siteMeta.description);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VariantPanelProvider>
      <App />
    </VariantPanelProvider>
  </StrictMode>,
);
