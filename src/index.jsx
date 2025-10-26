import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
// Ensure we only create root once
const root = rootElement._reactRootContainer || createRoot(rootElement);
rootElement._reactRootContainer = root;

root.render(
  <App />
);
