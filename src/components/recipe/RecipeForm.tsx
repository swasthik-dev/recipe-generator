import React, { useState, useContext } from 'react';
import { Plus, Trash2, ChefHat, ArrowRight } from 'lucide-react';
import { RecipeFormData } from '../../types';
import { RecipeContext } from '../../context/RecipeContext';

const cuisines = [
  'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 
  'Thai', 'French', 'Greek', 'Spanish', 'American',
  'Middle Eastern', 'Korean', 'Vietnamese'
];

const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
  'Keto', 'Paleo', 'Low-Carb', 'High-Protein', 'Pescatarian', 
  'Nut-Free', 'Soy-Free', 'Low-Fat', 'Diabetic-Friendly'
];

interface RecipeFormProps {
  onRecipeGenerated: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onRecipeGenerated }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { generateRecipe, isLoading } = useContext(RecipeContext);

  const handleAddIngredient = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentIngredient.trim()) return;
    
    setIngredients(prev => [...prev, currentIngredient.trim()]);
    setCurrentIngredient('');
    
    // Clear ingredient error if it exists
    if (errors.ingredients) {
      const { ingredients, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleDietaryToggle = (option: string) => {
    if (dietaryPreferences.includes(option)) {
      setDietaryPreferences(dietaryPreferences.filter(item => item !== option));
    } else {
      setDietaryPreferences([...dietaryPreferences, option]);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (ingredients.length === 0 && !currentIngredient.trim()) {
      newErrors.ingredients = 'Please add at least one ingredient';
    }
    
    if (!cuisine) {
      newErrors.cuisine = 'Please select a cuisine';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If there's a current ingredient, add it before submitting
    if (currentIngredient.trim()) {
      await handleAddIngredient();
    }
    
    if (!validateForm()) return;
    
    const formData: RecipeFormData = {
      ingredients,
      cuisine,
      dietaryPreferences,
    };
    
    const result = await generateRecipe(formData);
    if (result) {
      onRecipeGenerated();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <label htmlFor="ingredients" className="label">Ingredients</label>
        <div className="flex">
          <input
            type="text"
            id="ingredients"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input flex-1 rounded-r-none"
            placeholder="Add an ingredient..."
          />
          <button
            type="button"
            onClick={() => handleAddIngredient()}
            className="px-4 bg-secondary-500 text-white rounded-r-md hover:bg-secondary-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        {errors.ingredients && (
          <p className="text-error-500 text-sm mt-1">{errors.ingredients}</p>
        )}
        
        {/* Ingredient chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <div 
              key={`${ingredient}-${index}`}
              className="bg-neutral-100 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 group"
            >
              <span>{ingredient}</span>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-neutral-400 hover:text-error-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="cuisine" className="label">Cuisine</label>
        <select
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="input"
        >
          <option value="">Select a cuisine</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.cuisine && (
          <p className="text-error-500 text-sm mt-1">{errors.cuisine}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="label">Dietary Preferences (Optional)</label>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleDietaryToggle(option)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                dietaryPreferences.includes(option)
                  ? 'bg-secondary-100 text-secondary-700 font-medium'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Generating Recipe...</span>
          </>
        ) : (
          <>
            <ChefHat size={18} />
            <span>Generate Recipe</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
};

export default RecipeForm;