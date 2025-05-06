export interface User {
  id?: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Recipe {
  id?: string;
  title: string;
  ingredients: string[];
  steps: string[];
  cuisine: string;
  dietaryPreferences: string[];
  image: string;
  cookTime?: string;
  servings?: number;
  createdAt?: string;
  userId?: string;
}

export interface RecipeFormData {
  ingredients: string[];
  cuisine: string;
  dietaryPreferences: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export interface RecipeContextType {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  generateRecipe: (formData: RecipeFormData) => Promise<Recipe | null>;
  saveRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  fetchSavedRecipes: () => Promise<void>;
}