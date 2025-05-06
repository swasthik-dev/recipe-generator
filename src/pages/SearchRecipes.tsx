import React, { useState, useContext } from 'react';
import { Search, ChefHat, Filter } from 'lucide-react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCardGrid from '../components/ui/RecipeCardGrid';

const cuisines = [
  'All', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 
  'Thai', 'French', 'Greek', 'Spanish', 'American'
];

const dietaryOptions = [
  'All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
  'Keto', 'Paleo', 'Low-Carb'
];

const SearchRecipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { recipes, saveRecipe, savedRecipes } = useContext(RecipeContext);
  
  const savedRecipeIds = savedRecipes.map(recipe => recipe.id || '');
  
  const filteredRecipes = recipes.filter(recipe => {
    // Text search
    const matchesSearch = searchTerm === '' || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Cuisine filter
    const matchesCuisine = selectedCuisine === 'All' || 
      recipe.cuisine === selectedCuisine;
    
    // Diet filter
    const matchesDiet = selectedDiet === 'All' || 
      (recipe.dietaryPreferences && 
       recipe.dietaryPreferences.includes(selectedDiet));
    
    return matchesSearch && matchesCuisine && matchesDiet;
  });
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Recipes</h1>
          <p className="text-neutral-600">
            Find the perfect recipe by searching ingredients, cuisine, or dietary preferences.
          </p>
        </div>
        
        {/* Search and Filter UI */}
        <div className="bg-white p-6 rounded-lg shadow-card mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by recipe name or ingredient..."
              className="input pl-10"
            />
          </div>
          
          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden mb-4">
            <button
              onClick={toggleFilters}
              className="btn btn-outline w-full"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Filters */}
          <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cuisine Filter */}
              <div>
                <label className="label">Cuisine</label>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => setSelectedCuisine(cuisine)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedCuisine === cuisine
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Dietary Filter */}
              <div>
                <label className="label">Dietary Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setSelectedDiet(diet)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedDiet === diet
                          ? 'bg-secondary-100 text-secondary-700 font-medium'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-card text-center">
            <ChefHat size={48} className="mx-auto text-neutral-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Recipes Found</h2>
            <p className="text-neutral-600 mb-6">
              No recipes match your search criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <RecipeCardGrid 
            recipes={filteredRecipes}
            onSaveRecipe={saveRecipe}
            savedRecipeIds={savedRecipeIds}
          />
        )}
      </div>
    </div>
  );
};

export default SearchRecipes;