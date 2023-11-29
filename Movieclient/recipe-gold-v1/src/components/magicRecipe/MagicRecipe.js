import './MagicRecipe.css'
import React from 'react';
import api from '../../api/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MagicRecipeForm from '../reviewForm/MagicRecipeForm'

const MagicRecipe = ({ getRecipeData, recipe, reviews, setReviews }) => {
    const revText = useRef();
    const [foundRecipes, setFoundRecipes] = useState([]);

    const handleMagicSearch = async (e) => {
        e.preventDefault();

        const inputIngredients = revText.current.value;
        const ingredientsArray = inputIngredients.split(',').map((ingredient) => ingredient.trim());

        try {
            const response = await api.get('/api/v1/recipes', { cleaned_Ingredients: ingredientsArray });

            // Log the response to the console for debugging
            console.log('API Response:', response);

            // Assuming that the response.data contains an array of found recipes
            setFoundRecipes(response.data);

            // Clear input field
            revText.current.value = '';
        } catch (err) {
            console.error('API Error:', err);
        }
    };

    // Log the state for debugging
    console.log('Found Recipes:', foundRecipes);

    return (
        <Container className='whole-container'>
            {/* ... (previous JSX code) */}
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <MagicRecipeForm handleSubmit={handleMagicSearch} revText={revText} labelText="Enter Ingredients (comma-separated)" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {/* Render the found recipes */}
                    {foundRecipes.map((foundRecipe) => (
                        <Row key={foundRecipe.id}>
                            <Col>
                                {/* Display the details of each found recipe */}
                                {foundRecipe.title}
                                {/* Add other details as needed */}
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
            {/* ... (remaining JSX code) */}
        </Container>
    );
};

export default MagicRecipe;