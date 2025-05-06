import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Utensils, Search, BookOpenText, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import RecipeCardGrid from '../components/ui/RecipeCardGrid';
import { RecipeContext } from '../context/RecipeContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { recipes, saveRecipe, savedRecipes } = useContext(RecipeContext);

  const featuredRecipes = recipes.slice(0, 3);
  const savedRecipeIds = savedRecipes.map(recipe => recipe.id);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl animate-fade">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cook Smarter, Not Harder
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Generate custom recipes based on your ingredients, cuisine preferences, and dietary needs using AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/generate" className="btn btn-primary bg-white text-primary-600 hover:bg-neutral-100">
                <ChefHat size={20} />
                <span>Generate Recipe</span>
              </Link>
              {isAuthenticated ? (
                <Link to="/saved-recipes" className="btn btn-outline border-white text-white hover:bg-white/10">
                  <BookOpenText size={20} />
                  <span>My Recipes</span>
                </Link>
              ) : (
                <Link to="/login" className="btn btn-outline border-white text-white hover:bg-white/10">
                  <ArrowRight size={20} />
                  <span>Get Started</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our AI-powered recipe generator creates personalized recipes based on your inputs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-card transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Utensils size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Ingredients</h3>
              <p className="text-neutral-600">
                Tell us what ingredients you have available in your kitchen.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-card transition-shadow">
              <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <Search size={28} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Specify Preferences</h3>
              <p className="text-neutral-600">
                Choose your cuisine style and any dietary restrictions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-card transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <ChefHat size={28} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Custom Recipes</h3>
              <p className="text-neutral-600">
                Receive personalized step-by-step recipes based on your inputs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Recipes Section */}
      {featuredRecipes.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Recipes</h2>
              <Link to="/search" className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
                <span>View all</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <RecipeCardGrid 
              recipes={featuredRecipes}
              onSaveRecipe={saveRecipe}
              savedRecipeIds={savedRecipeIds}
            />
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Cook Something Amazing?</h2>
            <p className="text-neutral-700 mb-8 text-lg">
              Try our AI-powered recipe generator now and discover new culinary possibilities with ingredients you already have.
            </p>
            <Link to="/generate" className="btn btn-primary">
              <ChefHat size={20} />
              <span>Generate Your Recipe</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;