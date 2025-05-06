import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Home, Search, User, BookOpenText, Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <ChefHat size={28} className="text-primary-500" />
            <span className="text-xl font-serif font-bold">RecipeAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 ${isActive('/') ? 'text-primary-600 font-medium' : 'text-neutral-600 hover:text-primary-500'}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/generate" 
              className={`flex items-center space-x-1 ${isActive('/generate') ? 'text-primary-600 font-medium' : 'text-neutral-600 hover:text-primary-500'}`}
            >
              <ChefHat size={18} />
              <span>Generate</span>
            </Link>
            <Link 
              to="/search" 
              className={`flex items-center space-x-1 ${isActive('/search') ? 'text-primary-600 font-medium' : 'text-neutral-600 hover:text-primary-500'}`}
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/saved-recipes" 
                className={`flex items-center space-x-1 ${isActive('/saved-recipes') ? 'text-primary-600 font-medium' : 'text-neutral-600 hover:text-primary-500'}`}
              >
                <BookOpenText size={18} />
                <span>Saved Recipes</span>
              </Link>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                >
                  <User size={18} />
                  <span>{user?.name || 'Profile'}</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="btn btn-outline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn btn-outline">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-700 hover:text-primary-500 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slideDown">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 py-2 ${isActive('/') ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}
                onClick={closeMenu}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link 
                to="/generate" 
                className={`flex items-center space-x-2 py-2 ${isActive('/generate') ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}
                onClick={closeMenu}
              >
                <ChefHat size={18} />
                <span>Generate</span>
              </Link>
              <Link 
                to="/search" 
                className={`flex items-center space-x-2 py-2 ${isActive('/search') ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}
                onClick={closeMenu}
              >
                <Search size={18} />
                <span>Search</span>
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/saved-recipes" 
                  className={`flex items-center space-x-2 py-2 ${isActive('/saved-recipes') ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}
                  onClick={closeMenu}
                >
                  <BookOpenText size={18} />
                  <span>Saved Recipes</span>
                </Link>
              )}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-neutral-200">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 py-2 text-neutral-700"
                    onClick={closeMenu}
                  >
                    <User size={18} />
                    <span>{user?.name || 'Profile'}</span>
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }} 
                    className="btn btn-outline w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/login" 
                    className="btn btn-outline w-full"
                    onClick={closeMenu}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary w-full"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;