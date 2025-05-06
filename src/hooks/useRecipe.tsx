import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  
  return context;
};

export default useRecipe;