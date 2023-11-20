import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { ServiceProvider } from 'shared/providers/ServiceProvider';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root)

container.render(
    <ServiceProvider>
      <App />
    </ServiceProvider>
);
