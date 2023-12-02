import './Reviews.css'
import React from 'react';
import api from '../../api/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getRecipeData, recipe, reviews, setReviews }) => {
    const revText = useRef();
    const params = useParams();
    const recipeId = params.recipeId;

    // Needed to persist imageUrl
    const [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await getRecipeData(recipeId);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [recipeId]);

    // Needed to show image and get url after data has been fetched
    useEffect(() => {
        if (recipe?.image?.data?.data) {
            const imageData = atob(recipe.image.data.data.toString('base64'));
            const contentType = recipe.image.content_type;
            const blob = new Blob([new Uint8Array([...imageData].map((char) => char.charCodeAt(0)))], { type: contentType });
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [recipe]);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post('/api/v1/reviews', { reviewBody: rev.value, newUniqueIdField: recipeId });

            const updatedReviews = [...reviews, { body: rev.value }];

            setReviews(updatedReviews);

            rev.value = '';
        } catch (err) {
            console.error(err);
        }
    };

    const formatIngredients = (ingredientsArray) => {
        if (!ingredientsArray || !Array.isArray(ingredientsArray)) return null;

        // Return a JSX representation of the formatted ingredients
        return ingredientsArray.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ));
    };

    // cleaned_Ingredients is no longer a String but an array

    /* const formatIngredients = (ingredientsString) => {
        if (!ingredientsString) return null;

        // Remove both [' at the beginning and '] at the end of the string
        const cleanedString = ingredientsString.replace(/^\['|'\]$/g, '');

        // Split the string into an array of ingredients
        const ingredientsArray = cleanedString.split("', '");

        // Return a JSX representation of the formatted ingredients
        return ingredientsArray.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ));
    }; */

    return (
        <Container className='whole-container'>
            <Row className='review-title'>
                <Col>
                    {recipe?.title}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className='ingredients-instructions'>
                    <Row className='review-img-container'>
                        {imageUrl && <img src={imageUrl} alt="" className='review-img' />}
                    </Row>
                    <Row>
                        <ul>
                            {formatIngredients(recipe?.cleaned_Ingredients)}
                        </ul>
                    </Row>
                    <Row>
                        {recipe?.instructions}
                    </Row>
                </Col>
                <Col>
                    {reviews ? (
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            {reviews.map((r, index) => (
                                <React.Fragment key={index}>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            ))}
                        </>
                    ) : (
                        <p>Loading reviews...</p>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
