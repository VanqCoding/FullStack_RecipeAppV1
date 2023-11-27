import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './Header.css';

const Header = () => {
    return (

        <Navbar bg="dark" variant="dark" expand="lg" className="navbar-whole">
            <Container fluid className="navbar-container">

                <Navbar.Brand href="/" style={{ "color": 'gold' }}>
                    <FontAwesomeIcon icon={faPizzaSlice} spin /><span style={{ marginLeft: '10px' }}>Food Preparation & Recipes</span></Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/">Recipe List</NavLink>
                    </Nav>
                    <Button className="btn">Login</Button>
                    <Button className="btn">Register</Button>
                </Navbar.Collapse>

            </Container>
        </Navbar>

    )
}

export default Header