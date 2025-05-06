import React, { useContext, useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import RecipeCardGrid from '../components/ui/RecipeCardGrid';

const SavedRecipes: React.FC = () => {
  const { savedRecipes, isLoading, fetchSavedRecipes, saveRecipe, deleteRecipe } = useContext(RecipeContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedRecipes();
    }
  }, [isAuthenticated, fetchSavedRecipes]);
  
  const savedRecipeIds = savedRecipes.map(recipe => recipe.id || '');
  
  if (!isAuthenticated) {
    return (
      <div className="bg-neutral-50 min-h-screen py-20">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-card">
            <ChefHat size={48} className="mx-auto text-primary-500 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Login Required</h1>
            <p className="text-neutral-600 mb-6">
              Please log in to view and manage your saved recipes.
            </p>
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="bg-neutral-50 min-h-screen py-10">
        <div className="container-custom">
          <div className="flex justify-center items-center py-20">
            <div className="loader w-12 h-12 border-4 border-neutral-300 border-t-primary-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Saved Recipes</h1>
          <p className="text-neutral-600">
            View and manage all your favorite recipes in one place.
          </p>
        </div>
        
        {savedRecipes.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-card text-center">
            <ChefHat size={48} className="mx-auto text-neutral-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Saved Recipes Yet</h2>
            <p className="text-neutral-600 mb-6">
              You haven't saved any recipes yet. Generate some custom recipes and save them to access them here!
            </p>
            <Link to="/generate" className="btn btn-primary">
              Generate a Recipe
            </Link>
          </div>
        ) : (
          <RecipeCardGrid 
            recipes={savedRecipes}
            onSaveRecipe={(recipe) => deleteRecipe(recipe.id || '')}
            savedRecipeIds={savedRecipeIds}
          />
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;