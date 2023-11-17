import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [recipes, setRecipes] = useState();
  const [recipe, setRecipe] = useState();
  const [reviews, setReviews] = useState([]);

  const getRecipes = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/recipes");

      setRecipes(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getRecipeData = async (recipeId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/recipes/${recipeId}`);

        const singleRecipe = response.data;

        setRecipe(singleRecipe);

        setReviews(singleRecipe.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getRecipes();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home recipes={recipes} />} ></Route>
            <Route path="/Reviews/:recipeId" element ={<Reviews getRecipeData = {getRecipeData} recipe={recipe} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;