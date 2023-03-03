import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;