import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RecipeContextType, Recipe, RecipeFormData } from '../types';
import { AuthContext } from './AuthContext';

// Curated food images by cuisine type
const CUISINE_IMAGES = {
  Italian: [
    'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', // Pasta
    'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg', // Pizza
    'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg', // Risotto
  ],
  Mexican: [
    'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg', // Tacos
    'https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg', // Enchiladas
    'https://images.pexels.com/photos/5737585/pexels-photo-5737585.jpeg', // Burritos
  ],
  Chinese: [
    'https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg', // Stir Fry
    'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg', // Dumplings
    'https://images.pexels.com/photos/1020317/pexels-photo-1020317.jpeg', // Noodles
  ],
  Indian: [
    'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', // Curry
    'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg', // Biryani
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg', // Tandoori
  ],
  Japanese: [
    'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg', // Sushi
    'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg', // Ramen
    'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg', // Tempura
  ],
  Thai: [
    'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg', // Pad Thai
    'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg', // Curry
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', // Stir Fry
  ],
  French: [
    'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg', // Croissants
    'https://images.pexels.com/photos/299410/pexels-photo-299410.jpeg', // Coq au Vin
    'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg', // Ratatouille
  ],
  Greek: [
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', // Greek Salad
    'https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg', // Souvlaki
    'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg', // Moussaka
  ]
};

// Default images for cuisines without specific photos
const DEFAULT_IMAGES = [
  'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
  'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
  'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg',
];

// Recipe templates based on cuisine
const RECIPE_TEMPLATES: { [key: string]: { steps: string[], cookingTips: string[], titles: string[] } } = {
  Italian: {
    steps: [
      'Heat olive oil in a large pan over medium heat.',
      'Add garlic and onions, sauté until fragrant.',
      'Add your main ingredients and cook until golden.',
      'Pour in the sauce and bring to a simmer.',
      'Season with Italian herbs and spices.',
      'Cook until all ingredients are tender.',
      'Finish with fresh basil and grated cheese.',
    ],
    cookingTips: ['Use extra virgin olive oil', 'Fresh herbs make a difference', 'Al dente pasta is key'],
    titles: [
      'Authentic {ingredient} alla {region}',
      'Homemade {ingredient} with Fresh Herbs',
      'Classic Italian {ingredient} Recipe',
      'Rustic {ingredient} with {secondary}',
      'Traditional {ingredient} al Forno'
    ]
  },
  Mexican: {
    steps: [
      'Heat oil in a large skillet over medium-high heat.',
      'Cook onions and peppers until softened.',
      'Add your protein and cook until browned.',
      'Stir in spices and seasonings.',
      'Add remaining ingredients and simmer.',
      'Cook until flavors meld together.',
      'Garnish with fresh cilantro and lime.',
    ],
    cookingTips: ['Toast your spices', 'Use fresh lime juice', 'Don\'t skip the cilantro'],
    titles: [
      'Authentic Mexican {ingredient} Recipe',
      'Spicy {ingredient} con {secondary}',
      'Street-Style {ingredient} Tacos',
      'Homestyle Mexican {ingredient}',
      '{ingredient} a la Mexicana'
    ]
  },
  // Add more cuisines as needed...
};

// Helper function to generate cooking instructions
const generateInstructions = (ingredients: string[], cuisine: string, dietaryPreferences: string[]): string[] => {
  const template = RECIPE_TEMPLATES[cuisine] || RECIPE_TEMPLATES['Italian'];
  const steps = [...template.steps];
  
  const mainIngredient = ingredients[0];
  const secondaryIngredients = ingredients.slice(1);
  
  return steps.map(step => {
    return step
      .replace('main ingredients', mainIngredient)
      .replace('remaining ingredients', secondaryIngredients.join(', '));
  });
};

// Helper function to generate recipe title
const generateTitle = (ingredients: string[], cuisine: string): string => {
  const mainIngredient = ingredients[0];
  const secondaryIngredient = ingredients[1] || '';
  
  const templates = RECIPE_TEMPLATES[cuisine]?.titles || [
    '{cuisine}-Style {ingredient} Delight',
    'Traditional {cuisine} {ingredient}',
    '{ingredient} {cuisine} Special',
    'Homemade {cuisine} {ingredient}',
    '{cuisine} {ingredient} with {secondary}'
  ];
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return template
    .replace('{ingredient}', mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1))
    .replace('{secondary}', secondaryIngredient.charAt(0).toUpperCase() + secondaryIngredient.slice(1))
    .replace('{cuisine}', cuisine)
    .replace('{region}', ['Toscana', 'Roma', 'Napoli', 'Milano'][Math.floor(Math.random() * 4)]);
};

// Helper function to get cuisine-specific image
const getCuisineImage = (cuisine: string): string => {
  const cuisineImages = CUISINE_IMAGES[cuisine as keyof typeof CUISINE_IMAGES];
  if (cuisineImages) {
    return cuisineImages[Math.floor(Math.random() * cuisineImages.length)];
  }
  return DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
};

export const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  savedRecipes: [],
  isLoading: false,
  error: null,
  generateRecipe: async () => null,
  saveRecipe: async () => {},
  deleteRecipe: async () => {},
  fetchSavedRecipes: async () => {},
});

type RecipeProviderProps = {
  children: ReactNode;
};

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  const generateRecipe = async (formData: RecipeFormData): Promise<Recipe | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRecipe: Recipe = {
        id: Math.random().toString(36).substr(2, 9),
        title: generateTitle(formData.ingredients, formData.cuisine),
        ingredients: formData.ingredients,
        steps: generateInstructions(formData.ingredients, formData.cuisine, formData.dietaryPreferences),
        cuisine: formData.cuisine,
        dietaryPreferences: formData.dietaryPreferences,
        image: getCuisineImage(formData.cuisine),
        cookTime: `${Math.floor(Math.random() * 30 + 15)} minutes`,
        servings: Math.floor(Math.random() * 4 + 2),
        createdAt: new Date().toISOString(),
      };

      if (user) {
        newRecipe.userId = user.id;
      }

      setRecipes(prev => [newRecipe, ...prev]);
      return newRecipe;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecipe = async (recipe: Recipe): Promise<void> => {
    if (!user) {
      setError('You must be logged in to save recipes');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      setSavedRecipes(prev => {
        if (prev.some(r => r.id === recipe.id)) {
          return prev;
        }
        return [recipe, ...prev];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save recipe');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      setSavedRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete recipe');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedRecipes = async (): Promise<void> => {
    if (!user) {
      setSavedRecipes([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll just use whatever is in the state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch saved recipes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipes,
        isLoading,
        error,
        generateRecipe,
        saveRecipe,
        deleteRecipe,
        fetchSavedRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;