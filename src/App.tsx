import { AppProviders } from '@contexts/App/AppProviders';
import { AppRouter } from '@routes/Index';

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
