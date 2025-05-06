import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import RecipeProvider from './context/RecipeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import GenerateRecipe from './pages/GenerateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import SearchRecipes from './pages/SearchRecipes';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate" element={<GenerateRecipe />} />
                <Route path="/saved-recipes" element={<SavedRecipes />} />
                <Route path="/search" element={<SearchRecipes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;