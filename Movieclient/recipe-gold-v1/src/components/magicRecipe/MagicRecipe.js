import './MagicRecipe.css';
import api from '../../api/axiosConfig';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MagicRecipeForm from '../reviewForm/MagicRecipeForm';

const MagicRecipe = () => {
    const [foundRecipes, setFoundRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    // Needed to persist imageUrl
    const [imageUrl, setImageUrl] = useState(null);

    const revText = useRef();

    // Define pageSize here
    const pageSize = 20;

    const handlePageChange = async (newPage) => {
        const nextPage = Math.max(0, Math.min(newPage, totalPages - 1));
        await setCurrentPage(nextPage);
        await handleSubmit(null, nextPage, pageSize);  // Pass pageSize to handleSubmit
    };

    const handleSubmit = async (event, page = 0, size = pageSize) => {
        // Make sure to prevent the default form submission only if event is not null
        if (event) {
            event.preventDefault();
        }
        const ingredients = revText.current.value.split(',').map((ingredient) => ingredient.trim());

        // Create an AbortController
        const abortController = new AbortController();
        const { signal } = abortController;

        try {
            setLoading(true); // Set loading to true while waiting for the response

            const encodedQuery = encodeURIComponent(ingredients.join(','));
            const response = await api.get(`/api/v1/recipes/magicsearch?query=${encodedQuery}&page=${page}&size=${pageSize}`, { signal });
            console.log(`Response for ${ingredients} - Page ${page}:`, response.data);
            console.log('Response from Backend:', response);
            console.log('Pagination Information:', {
                totalPages: response.data.totalPages,
                currentPage: currentPage,
            });


            if (Array.isArray(response.data.content)) {
                setFoundRecipes(response.data.content);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.number);
            } else {
                setFoundRecipes([]);
                setTotalPages(0);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted:', error.message);
            } else {
                console.error('Error in handleSubmit:', error);
                // Handle other errors as needed
            }
        } finally {
            // Cleanup: If the request is not complete, abort it
            abortController.abort();
            setLoading(false); // Set loading back to false, whether the request was successful or not
        }
    };

    // Log the state for debugging
    console.log('Found Recipes:', foundRecipes);
    console.log('currentPage:', currentPage);
    console.log('totalPages:', totalPages);

    const MyPagination = ({ activePage, totalPages, onSelect }) => {
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return (
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={page === activePage ? 'active' : ''}
                        onClick={() => {
                            console.log('Selected Page:', page);
                            onSelect(page - 1);
                        }}
                    >
                        <a href="#">{page}</a>
                    </li>
                ))}
            </ul>
        );
    };

    // Needed to show image and get url after data has been fetched
    useEffect(() => {
        const fetchImageUrls = async () => {
            const imageUrlMap = {};

            await Promise.all(
                foundRecipes.map(async (foundRecipe) => {
                    if (foundRecipe?.image?.data?.data) {
                        const imageData = atob(foundRecipe.image.data.data.toString('base64'));
                        const contentType = foundRecipe.image.content_type;
                        const blob = new Blob([new Uint8Array([...imageData].map((char) => char.charCodeAt(0)))], { type: contentType });
                        const url = URL.createObjectURL(blob);

                        // Update the image URL for the specific recipe
                        imageUrlMap[foundRecipe?.newUniqueIdField] = url;
                    }
                })
            );

            setImageUrl(imageUrlMap);
        };

        fetchImageUrls();
    }, [foundRecipes]);




    return (
        <Container className='magic-container'>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            {/* Pass handleSubmit as the callback for form submission */}
                            <MagicRecipeForm handleSubmit={handleSubmit} revText={revText} labelText="Enter Ingredients (comma-separated)" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {loading ? (
                        <p>Loading recipe suggestions...</p>
                    ) : (
                        <Row>
                            {foundRecipes.map((foundRecipe, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <Row className="recipe-item">
                                        <Col className="title-col">
                                            {foundRecipe.title}
                                        </Col>
                                    </Row>
                                    <Row className='magic-img-container'>
                                        <Col>
                                            {imageUrl && imageUrl[foundRecipe.newUniqueIdField] && <img src={imageUrl[foundRecipe.newUniqueIdField]} alt="" className='magic-img' />}
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    )}




                    <MyPagination
                        activePage={currentPage + 1} // Bootstrap Pagination uses 1-based indexing
                        totalPages={totalPages} // Pass the correct totalPages prop
                        onSelect={handlePageChange}
                    />
                </Col>
            </Row>
        </Container >
    );
};

export default MagicRecipe;