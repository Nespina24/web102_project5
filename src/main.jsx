import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx';
import RecipeDetails from './RecipeDetails.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/recipe/:id" element ={<RecipeDetails />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
