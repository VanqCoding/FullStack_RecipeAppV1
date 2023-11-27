import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './Header.css';
import chefHat from '../../assets/chef-hat.png'

const Header = () => {
    return (

        <Navbar expand="lg" className="navbar-whole">
            <Container fluid className="navbar-container">

                <Navbar.Brand href="/" style={{ "color": 'gold' }}>
                    {/* <FontAwesomeIcon icon={faPizzaSlice} spin /><span style={{ marginLeft: '10px' }}>Food Preparation & Recipes</span> */}
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
                        <NavLink className="nav-link" to="/">Recipe List</NavLink>
                    </Nav>
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    <Button className="btn">Login</Button>
                    <Button className="btn">Register</Button>
                </Navbar.Collapse>

            </Container>
        </Navbar>

    )
}

export default Header