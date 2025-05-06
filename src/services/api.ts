import axios from 'axios';
import { Recipe, RecipeFormData } from '../types';

const API_URL = 'http://localhost:8000';

export const generateRecipe = async (formData: RecipeFormData): Promise<Recipe> => {
  try {
    const response = await axios.post(`${API_URL}/generate-recipe`, {
      ingredients: formData.ingredients,
      cuisine: formData.cuisine,
      dietary_preferences: formData.dietaryPreferences
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to generate recipe');
  }
};