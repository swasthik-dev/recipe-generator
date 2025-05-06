import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RecipeContext } from '../../context/RecipeContext';
import RecipeForm from './RecipeForm';

describe('RecipeForm', () => {
  const mockGenerateRecipe = vi.fn();
  const mockOnRecipeGenerated = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecipeContext.Provider
      value={{
        recipes: [],
        savedRecipes: [],
        isLoading: false,
        error: null,
        generateRecipe: mockGenerateRecipe,
        saveRecipe: vi.fn(),
        deleteRecipe: vi.fn(),
        fetchSavedRecipes: vi.fn(),
      }}
    >
      {children}
    </RecipeContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<RecipeForm onRecipeGenerated={mockOnRecipeGenerated} />, { wrapper });
    
    expect(screen.getByPlaceholderText(/add an ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/cuisine/i)).toBeInTheDocument();
    expect(screen.getByText(/dietary preferences/i)).toBeInTheDocument();
  });

  it('adds ingredients when entered', async () => {
    render(<RecipeForm onRecipeGenerated={mockOnRecipeGenerated} />, { wrapper });
    
    const input = screen.getByPlaceholderText(/add an ingredient/i);
    fireEvent.change(input, { target: { value: 'tomatoes' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('tomatoes')).toBeInTheDocument();
  });

  it('validates form before submission', async () => {
    render(<RecipeForm onRecipeGenerated={mockOnRecipeGenerated} />, { wrapper });
    
    fireEvent.click(screen.getByRole('button', { name: /generate recipe/i }));
    
    expect(await screen.findByText(/please add at least one ingredient/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    mockGenerateRecipe.mockResolvedValueOnce({ id: '1', title: 'Test Recipe' });
    
    render(<RecipeForm onRecipeGenerated={mockOnRecipeGenerated} />, { wrapper });
    
    // Add ingredient
    const input = screen.getByPlaceholderText(/add an ingredient/i);
    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    // Select cuisine
    const cuisineSelect = screen.getByRole('combobox');
    fireEvent.change(cuisineSelect, { target: { value: 'Italian' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /generate recipe/i }));
    
    await waitFor(() => {
      expect(mockGenerateRecipe).toHaveBeenCalledWith({
        ingredients: ['chicken'],
        cuisine: 'Italian',
        dietaryPreferences: [],
      });
      expect(mockOnRecipeGenerated).toHaveBeenCalled();
    });
  });
});