import React from 'react';
import { Clock, Users, Utensils, BookmarkPlus, Printer, Share2 } from 'lucide-react';
import { Recipe } from '../../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onSave?: () => void;
  isSaved?: boolean;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onSave, isSaved = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade">
      {/* Hero section with image and overlay */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Title and meta overlaid on image */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="badge badge-primary">{recipe.cuisine}</span>
            {recipe.dietaryPreferences && recipe.dietaryPreferences.map((pref, index) => (
              <span key={index} className="badge badge-secondary">{pref}</span>
            ))}
          </div>
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {recipe.title}
          </h1>
          
          {/* Recipe meta info */}
          <div className="flex flex-wrap items-center mt-3 text-white gap-x-6 gap-y-2">
            {recipe.cookTime && (
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{recipe.cookTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{recipe.servings} servings</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Utensils size={18} />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe content */}
      <div className="p-6">
        {/* Action buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button 
            className={`btn ${isSaved ? 'btn-primary' : 'btn-outline'}`}
            onClick={onSave}
          >
            <BookmarkPlus size={18} />
            <span>{isSaved ? 'Saved' : 'Save Recipe'}</span>
          </button>
          <button className="btn btn-outline">
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button className="btn btn-outline">
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
        
        {/* Main content in 2 columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-neutral-200">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 mt-0.5 rounded-full border border-primary-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-500 text-xs font-medium">{index + 1}</span>
                  </div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-neutral-200">
              Instructions
            </h2>
            <ol className="space-y-6">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;