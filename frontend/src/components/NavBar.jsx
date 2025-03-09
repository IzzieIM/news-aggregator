import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';

function NavBar() {

    // Dark Mode state
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Function to Toggle Dark Mode
    const toggleTheme = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            document.body.classList.toggle("dark-mode", newMode);
            return newMode;
        });
    };

    // Load Theme from Local Storage when Component Mounts
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);


    // scroll to that id Function 
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };



    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                {/* Left-aligned Brand (Clicking it redirects to Home) */}
                <Navbar.Brand onClick={() => setCurrentPage("home")} className="navbar-brand" style={{ cursor: "pointer" }}>
                    NEWS-CONNECT
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="mx-auto navbar-center">
                        {/* Home Button (Redirects to Home Page) */}
                        <Nav.Link onClick={() => navigate("home")} className="nav-link">Home</Nav.Link>

                        {/* Categories Dropdown */}
                        <NavDropdown title="Categories" id="basic-nav-dropdown" className="nav-dropdown">
                            <NavDropdown.Item onClick={() => scrollToSection("general")}>General</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("sports")}>Sports</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("business")}>Business</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("entertainment")}>Entertainment</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("politics")}>Politics</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("health")}>Health</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("science")}>Science</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => scrollToSection("technology")}>Technology</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {/* Favorites Page Link */}
                    <Button className="favorites-btn" onClick={() => navigate("/favorites")}>
                        ❤️ Favorites
                    </Button>

                    {/* Dark Mode Toggle Button */}
                    <Button className="theme-toggle-btn" onClick={toggleTheme}>
                        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </Button>


                    {/* Right-aligned "Let's Connect" Button */}
                    <Button className="connect-btn" onClick={() => scrollToSection("connect")}>Let's Connect</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
