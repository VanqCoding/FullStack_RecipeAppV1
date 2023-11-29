import './Hero.css';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
/* import Button from "react-bootstrap/Button"; */

const Hero = ({ recipes }) => {
  const navigate = useNavigate();

  function reviews(recipeId) {
    navigate(`/Reviews/${recipeId}`);
  }

  return (
    <div className='recipe-carousel-container'>
      <Carousel>
        {
          recipes?.map((recipe) => {
            // Use Blob to create a data URL for the image
            const imageData = atob(recipe.image.data.data.toString('base64'));
            const contentType = recipe.image.content_type;
            const blob = new Blob([new Uint8Array([...imageData].map((char) => char.charCodeAt(0)))], { type: contentType });
            const imageUrl = URL.createObjectURL(blob);

            return (
              <Paper key={recipe.newUniqueIdField}>
                <div className='recipe-card-container'>
                  <div className="recipe-card" style={{ "--img": `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}>
                    <h1 className='today-inspiration'>Chef's Picks: Inspirational Recipes!</h1>
                    <div className="recipe-detail">
                      <div className="recipe-poster">
                        <img src={imageUrl} alt="" />
                      </div>
                      <div className="recipe-title">
                        <h4>{recipe.title}</h4>
                      </div>
                      <div className="recipe-buttons-container">
                        <button onClick={() => reviews(recipe.newUniqueIdField)} className='recipe-button'><span className="recipe-button-text-one">Show recipe</span>
                          <span className="recipe-button-text-two">Leave Review</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default Hero;
