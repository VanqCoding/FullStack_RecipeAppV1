import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [recipes, setRecipes] = useState();
  const [allRecipes, setAllRecipes] = useState();
  const [recipe, setRecipe] = useState();
  const [reviews, setReviews] = useState([]);

  const getRecipes = async () => {

    try {

      const response = await api.get("/api/v1/recipes/home");

      setRecipes(response.data);

    }
    catch (err) {
      console.log(err);
    }
  }

  const getRecipeData = async (recipeId) => {
    try {
      console.log('Fetching recipe data for recipeId:', recipeId);
      const response = await api.get(`/api/v1/recipes/${recipeId}`);
      const singleRecipe = response.data;
      /* console.log('Fetched recipe data:', singleRecipe); */

      setRecipe(singleRecipe);

      // --- FIXED ---
      // setReviews(singleRecipe.reviews);
      setReviews(singleRecipe.reviewIds);
    } catch (error) {
      console.error('Error fetching recipe data:', error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [])

  return (
    <div className="App">
      <Header setAllRecipes={setAllRecipes} allRecipes={allRecipes} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home recipes={recipes} />} ></Route>

          <Route path="/Reviews/:recipeId" element={<Reviews getRecipeData={getRecipeData} recipe={recipe} reviews={reviews} setReviews={setReviews} />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;