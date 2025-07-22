import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import CaloriesChart from './CaloriesChart'
import IngredientsChart from './IngredientsChart'

const API_KEY = '5ea1e32ffde34599ba1e83bb10610b24';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [averageCalories, setAverageCalories] = useState(0);
  const [averageIngredients, setAverageIngredients] = useState(0);
  const [numResults, setNumResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCuisine = (name) => {
    setCuisines(prev =>
      prev.includes(name)
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };
  const cuisineParam = cuisines.join(',');
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`;

        if (ingredient) {
          API_URL += `&includeIngredients=${encodeURIComponent(ingredient)}`;
        }

        if (cuisineParam) {
          API_URL += `&cuisine=${encodeURIComponent(cuisineParam)}`;
        }

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const ids = data.results.map(recipe => recipe.id);

        if (ids.length === 0) {
          console.log('No recipes found.');
          setRecipes([]);
          setNumResults(0);
          setAverageCalories(0);
          setAverageIngredients(0);
          return;
        }

        const bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${ids.join(",")}&includeNutrition=true`;
        const bulkResponse = await fetch(bulkUrl);

        if (!bulkResponse.ok) {
          throw new Error('Network response was not ok (bulk)');
        }

        const bulkData = await bulkResponse.json();
        setRecipes(bulkData);
        setNumResults(bulkData.length);

        const total = bulkData.reduce((sum, recipe) => {
          const calories = recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0;
          return sum + calories;
        }, 0);
        setAverageCalories(Number((total / bulkData.length || 0).toFixed(2)));

        const totalIngredients = bulkData.reduce((sum, recipe) => {
          return sum + (recipe.extendedIngredients?.length || 0);
        }, 0);
        setAverageIngredients(Number((totalIngredients / bulkData.length || 0).toFixed(1)));

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [ingredient, cuisineParam]);

  return (
    <>
      <div className="body-container">
        <div className="card-list">
          <div className="card">
            <h3>Showing {numResults} recipes</h3>
          </div>
          <div className="card">
            <h3>Average Calories: {averageCalories}</h3>
          </div>
          <div className="card">
            <h3>Average ingredients per recipe: {averageIngredients}</h3>
          </div>
        </div>
        <div className="recipe-header">
          <div className="recipe-intro">
            <h2>Welcome to the Recipe Finder! Enter ingredients to find delicious recipes.</h2>
          </div>
          <h3>Search for Recipes</h3>
          <input
            type="text"
            placeholder="Enter ingredient(s)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setIngredient(searchTerm)}>Search</button>
          {['Italian', 'Mexican', 'Chinese', 'Indian', 'French', 'American'].map(cuisine => (
            <div key={cuisine}>
              <input
                type="checkbox"
                checked={cuisines.includes(cuisine)}
                onChange={() => toggleCuisine(cuisine)}
              />
              <label>{cuisine}</label>
            </div>
          ))}
        </div>
        <div className="chart-container">
          <div className="chart">
            <CaloriesChart recipes={recipes} />
          </div>
          <div className="chart">
            <IngredientsChart recipes={recipes} />
          </div>
        </div>
        <div className="recipe-list">
          <ul className="recipe-results">
            {recipes.map(recipe => (
              <li key={recipe.id} className="recipe-card">
                <div className="recipe-section">
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} width="100%" />
                </div>

                <div className="recipe-section">
                  <h3>Cuisine:</h3>
                  <p>{recipe.cuisines?.join(', ') || 'No cuisine info'}</p>
                </div>

                <div className="recipe-section">
                  <h3>Calories:</h3>
                  <p>
                    {recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A'}
                    {recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.unit || ''}
                  </p>
                </div>

                <div className="recipe-section">
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipe.extendedIngredients.map(ing => (
                      <li key={ing.id}>
                        {ing.amount} {ing.unit} {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <h3>Additional Details</h3>
                  <Link to={`/recipe/${recipe.id}`} state={{ recipe }}>
                    {recipe.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>

    </>
  )
}

export default App
