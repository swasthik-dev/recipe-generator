import React from 'react';
import { Recipe } from '../../types';
import RecipeCard from './RecipeCard';

interface RecipeCardGridProps {
  recipes: Recipe[];
  onSaveRecipe?: (recipe: Recipe) => void;
  savedRecipeIds?: string[];
}

const RecipeCardGrid: React.FC<RecipeCardGridProps> = ({ 
  recipes, 
  onSaveRecipe,
  savedRecipeIds = [] 
}) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-neutral-500">No recipes found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSave={() => onSaveRecipe && onSaveRecipe(recipe)}
          isSaved={savedRecipeIds.includes(recipe.id || '')}
        />
      ))}
    </div>
  );
};

export default RecipeCardGrid;