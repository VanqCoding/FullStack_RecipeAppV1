import './Header.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import chefHat from '../../assets/chef-hat.png'
import api from '../../api/axiosConfig';
/* import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"; */

const Header = ({ setAllRecipes }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    function reviews(recipeId) {
        navigate(`/Reviews/${recipeId}`);
    }

    useEffect(() => {
        const searchRecipes = async () => {
            try {
                const encodedQuery = encodeURIComponent(searchQuery);
                const response = await api.get(`/api/v1/recipes/search?query=${encodedQuery}`);
                setSearchResults(response.data);
                setAllRecipes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Only fetch results when searchQuery changes
        if (searchQuery.trim() !== '') {
            searchRecipes();
        }
    }, [searchQuery, setAllRecipes]);

    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            // Click outside the search container, so close the results
            setSearchResults([]);
        }
    };

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Navbar expand="lg" className="navbar-whole">
            <Navbar.Brand href="/" style={{ "color": 'gold' }}>
                <img src={chefHat} alt="chef hat" className="chef-hat-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse>
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/MagicRecipe">Magic Search</NavLink>
                </Nav>
                <div className="search-container" ref={searchContainerRef}>
                    <input
                        type="search"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='search-bar'
                    />
                    <ul className="search-results">
                        {searchResults.map((recipe, index) => (
                            <li key={index} onClick={() => {
                                reviews(recipe.newUniqueIdField)
                                setSearchResults([])
                            }}>{recipe.title}</li>
                        ))}
                    </ul>
                </div>
                <div className='login-buttons'>
                    <button className="login-button">Login</button>
                    <button className="login-button">Register</button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header