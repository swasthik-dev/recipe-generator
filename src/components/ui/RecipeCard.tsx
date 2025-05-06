import React from 'react';
import { Clock, Users, Heart, BookmarkPlus, Share2 } from 'lucide-react';
import { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: () => void;
  isSaved?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, isSaved = false }) => {
  return (
    <div className="card group h-full flex flex-col animate-fade">
      {/* Image container with overlay on hover */}
      <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
        
        {/* Recipe meta info overlay */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center space-x-4 text-white">
            {recipe.cookTime && (
              <div className="flex items-center space-x-1 text-xs">
                <Clock size={14} />
                <span>{recipe.cookTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center space-x-1 text-xs">
                <Users size={14} />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            className="p-1.5 bg-white/90 rounded-full text-neutral-700 hover:text-primary-500 transition-colors"
            title="Like recipe"
          >
            <Heart size={16} />
          </button>
          <button 
            className={`p-1.5 ${isSaved ? 'bg-primary-500 text-white' : 'bg-white/90 text-neutral-700 hover:text-primary-500'} rounded-full transition-colors`}
            onClick={onSave}
            title={isSaved ? 'Saved to your collection' : 'Save recipe'}
          >
            <BookmarkPlus size={16} />
          </button>
          <button 
            className="p-1.5 bg-white/90 rounded-full text-neutral-700 hover:text-primary-500 transition-colors"
            title="Share recipe"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and cuisine */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <span className="badge badge-primary">{recipe.cuisine}</span>
            {recipe.dietaryPreferences && recipe.dietaryPreferences.length > 0 && (
              <span className="badge badge-secondary">{recipe.dietaryPreferences[0]}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold mt-2 line-clamp-2 hover:line-clamp-none transition-all">
            {recipe.title}
          </h3>
        </div>
        
        {/* Ingredients preview */}
        <div className="mt-2 mb-4 flex-1">
          <p className="text-sm text-neutral-600 font-medium">Key ingredients:</p>
          <p className="text-sm text-neutral-700 line-clamp-2">
            {recipe.ingredients.slice(0, 4).join(', ')}
            {recipe.ingredients.length > 4 ? ' ...' : ''}
          </p>
        </div>
        
        {/* View button */}
        <div className="mt-auto pt-2">
          <button className="w-full btn btn-primary">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;