import './App.css'
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = '5ea1e32ffde34599ba1e83bb10610b24';

export default function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const passedRecipe = location.state?.recipe;

  const [recipe, setRecipe] = useState(passedRecipe);

  useEffect(() => {
    if (!recipe) {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          setRecipe(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchRecipe();
    }
  }, [id, recipe]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>Cuisines: {recipe.cuisines?.join(', ') || 'No cuisine info'}</p>
      <p>Calories: {
        recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A'
      }</p>
      <p>Diets: {recipe.diets?.join(', ') || 'No diet info'}</p>
      <p>Preparation time: {recipe.preparationMinutes || 'N/A'} minutes</p>
      <p>Cooking time: {recipe.cookingMinutes || 'N/A'} minutes</p>
      <p>Ready in {recipe.readyInMinutes || 'N/A'} minutes</p>
      <p>Servings: {recipe.servings || 'N/A'}</p>
      <h2>Ingredients:</h2>
      <ul className ="ingredients-list">
        {recipe.extendedIngredients?.map(ing => (
          <li key={ing.id}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
    </div>
  );
}