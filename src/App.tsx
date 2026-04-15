import { BrowserRouter, Routes, Route } from 'react-router-dom';

type MainAppProps = {
  basename?: string;
};

export default function App({ basename = import.meta.env.VITE_APP_BASE_NAME }: MainAppProps) {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="*" element={<div>Main App</div>} />
      </Routes>
    </BrowserRouter>
  );
}
