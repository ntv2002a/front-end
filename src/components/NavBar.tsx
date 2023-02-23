import React from "react";
import logo from '../Aura-logo-6.png';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';

export const NavBar = () => {
    return (
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="">
                <img src={logo} className="App-logo" alt="logo" />
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="./">Home</Nav.Link>
                <Nav.Link href="./dashboard">Dashboard</Nav.Link>
              </Nav>
              <Nav> <Button size='lg' variant="outline-light">Connect Wallet</Button>{' '}</Nav>
            </Container>
          </Navbar>
          <br />
        </div>
      );
}