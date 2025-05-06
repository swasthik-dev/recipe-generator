import React from 'react';
import { ChefHat, Mail, Github as GitHub, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-10 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat size={24} className="text-primary-400" />
              <span className="text-xl font-serif font-bold">RecipeAI</span>
            </div>
            <p className="text-neutral-300 text-sm mb-4">
              Generating personalized recipes with AI. Discover new culinary creations based on your preferences and available ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generate" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Generate Recipe
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Search Recipes
                </Link>
              </li>
              <li>
                <Link to="/saved-recipes" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Saved Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Subscribe</h3>
            <p className="text-neutral-300 text-sm mb-4">
              Get the latest recipes and updates delivered to your inbox.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-sm bg-neutral-700 text-white placeholder-neutral-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-primary-500 px-3 py-2 rounded-r-md text-white hover:bg-primary-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-700 text-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} RecipeAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;