import { createRoot } from 'react-dom/client';

import { loadSelectedApp, resolveAppSelection } from './bootstrap/appHost';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);

const bootstrap = async () => {
  const selection = resolveAppSelection(window.location.pathname);
  const { default: SelectedApp } = await loadSelectedApp(selection.appKey);

  root.render(<SelectedApp basename={selection.basename} />);
};

void bootstrap();
