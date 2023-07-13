import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { RestaurantDetail } from './pages/RestaurantDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:rId" element={<RestaurantDetail />} />
      </Routes>
    </div>
  );
}

export default App;
