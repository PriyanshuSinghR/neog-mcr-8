import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecipeContext, RecipeProvider } from './context/RecipeContext';
import './index.css';
import App from './App';
export { RecipeContext };

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </Router>
  </StrictMode>,
);
