import api from '../../api/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react';

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
      console.log(updatedReviews); // Check if the new review is added

      setReviews(updatedReviews);

      rev.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Recipe</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
            {recipe?.title}
            {imageUrl && <img src={imageUrl} alt="" />}
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
