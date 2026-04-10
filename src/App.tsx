import { AppProviders } from '@contexts/App/AppProviders';
import { AppRouter } from '@routes/Index';

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
