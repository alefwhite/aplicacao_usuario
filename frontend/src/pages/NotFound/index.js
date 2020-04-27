import React from 'react';
import Header from '../../assets/components/Header';
import {Jumbotron, Container} from 'react-bootstrap';

function NotFound() {

    return (
        <>
            <Header/>
            <Jumbotron fluid>
                <Container>
                    <h1>Página não encontrada</h1>
                    <p>
                        :(
                    </p>
                </Container>
            </Jumbotron>
          
        </>
    );
}

export default NotFound;