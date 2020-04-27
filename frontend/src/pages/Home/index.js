import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Header from '../../assets/components/Header'
import {Jumbotron, Card, Container, CardGroup, Button, Modal, Form} from 'react-bootstrap';
import toastr from 'toastr';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export default function Login() {
    const [mensagem, setMensagem] = useState('');    
    const [show, setShow] = useState(false);
    const [mensagens, setMensagens] = useState([]);

    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    async function handleMensagem(e) {
        e.preventDefault();
        
        const data = {
            mensagem,
            nome,
            email
        };

        try {
            const response = await api.post('/mensagem', data);

            if(response.status === 201) {
                toastr.info(response.data.message);
                setMensagem("");
                ListarMensagens();
                handleClose();
                                
            }
            console.log(response);
            

        } catch(erro) {
            alert("Falha ao cadastrar mensagem, tente novamente");
        }
    }

    useEffect(() => {
        ListarMensagens();

    }, [email]);

    function ListarMensagens() {
        api.get('/mensagem')
        .then(response => {
            setMensagens(response.data.mensagens);
        });
    }

    function FormatarData(data) {
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',         
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'America/Sao_Paulo' 
        };

        const dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(Date.parse(data));

        return dataFormatada;
    }
        

    return (
        <>
            <Header/>
            <Jumbotron fluid>
                <Container>
                    <h1>Bem vindo - {nome.toUpperCase()}</h1><br/>
                    <div>
                        <Button variant="info" size="lg" block onClick={handleShow}>Inserir Mensagem</Button>
                    </div>
                    <br/>

                    
                </Container>
            </Jumbotron>
            
            {mensagens.map(msg =>(
                <CardGroup className="espacamento" style={{marginTop: "30px"}} key={msg._id}>
                    <Card border="primary" style={{ width: '18rem' }}>
                        <Card.Header className="espacamento" style={{display: "flex", justifyContent: "space-between"}}>
                            {msg.email}                           
                        </Card.Header>
                        <Card.Body>
                        <Card.Title>Username - {msg.nome.toUpperCase()}</Card.Title>
                        <Card.Text>
                           Data - {FormatarData(msg.data)}                          
                        </Card.Text>                       
                        <Card.Text>
                           Mensagem - {msg.mensagem}                          
                        </Card.Text>                       
                        </Card.Body>
                    </Card>                
                </CardGroup>
            ))}
                

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleMensagem}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cadastrar nova Mensagem</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Insira aqui sua mensagem!</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="4" 
                                cols="10"
                                value={mensagem}
                                onChange={e => setMensagem(e.target.value)} 
                            required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            Enviar Mensagem
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </>
    );
}