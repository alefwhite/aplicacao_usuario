import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Button, Nav, Form} from 'react-bootstrap';


export default function Header() {
    function Logout() {
        localStorage.clear();
    }
    
    return (
        <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
            <Navbar.Brand href="/home">Dinamica de Teste</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">                     
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/mensagensUsuario">Minhas Mensagens</Nav.Link>
                </Nav>                        
                <Form inline>               
                    <Link to="/" onClick={Logout}> <Button variant="outline-light">Sair</Button></Link>
                </Form>
            </Navbar.Collapse>
        </Navbar>         
    );
}