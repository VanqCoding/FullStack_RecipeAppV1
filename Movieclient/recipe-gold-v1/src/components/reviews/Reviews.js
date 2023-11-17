import {useEffect, useRef, useState} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react'

const Reviews = ({getRecipeData,recipe,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const recipeId = params.recipeId;

    /* // Initialize reviews state with an empty array
    const [reviews, setReviews] = useState([]); */

    useEffect(()=>{
        getRecipeData(recipeId);
    },[])
    

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,newUniqueIdField:recipeId});

            const updatedReviews = [...reviews, {body:rev.value}];
            console.log(updatedReviews); // Check if the new review is added
    
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }
    
  return (
    
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <h3>{recipe?.title}</h3>
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {reviews?.map((r, index) => (
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
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews