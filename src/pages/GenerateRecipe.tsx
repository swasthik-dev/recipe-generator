import React, { useState, useContext } from 'react';
import RecipeForm from '../components/recipe/RecipeForm';
import RecipeDetail from '../components/recipe/RecipeDetail';
import { RecipeContext } from '../context/RecipeContext';
import { Recipe } from '../types';

const GenerateRecipe: React.FC = () => {
  const { recipes, saveRecipe, savedRecipes } = useContext(RecipeContext);
  const [showResults, setShowResults] = useState(false);

  // Get the latest generated recipe
  const latestRecipe = recipes.length > 0 ? recipes[0] : null;
  
  // Check if the recipe is already saved
  const isSaved = latestRecipe 
    ? savedRecipes.some(recipe => recipe.id === latestRecipe.id)
    : false;

  const handleRecipeGenerated = () => {
    setShowResults(true);
    // Scroll to results after a small delay to ensure rendering
    setTimeout(() => {
      document.getElementById('recipe-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    saveRecipe(recipe);
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Generate Your Custom Recipe</h1>
            <p className="text-neutral-600">
              Tell us what ingredients you have, what cuisine you prefer, and any dietary restrictions.
              Our AI will generate a personalized recipe just for you!
            </p>
          </div>
          
          <RecipeForm onRecipeGenerated={handleRecipeGenerated} />
          
          {showResults && latestRecipe && (
            <div id="recipe-results" className="mt-12 pt-4">
              <h2 className="text-2xl font-bold mb-6">Your Custom Recipe</h2>
              <RecipeDetail 
                recipe={latestRecipe}
                onSave={() => handleSaveRecipe(latestRecipe)}
                isSaved={isSaved}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateRecipe;