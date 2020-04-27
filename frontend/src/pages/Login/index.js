import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Button, Form } from 'react-bootstrap';
import './style.css';
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
    const [email, setEmail] = useState('');
    const [cadNome, setcadNome] = useState('');
    const [cadEmail, setcadEmail] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {            
            email
        }

        try {
            const response = await api.post('/login', data);

            if(response.status === 200) {
                toastr.success(response.data.message);

                localStorage.setItem('email', response.data.existeEmail.email);
                localStorage.setItem('nome', response.data.existeEmail.nome);
            }
            
            history.push('/home');                          

            console.log(response);


        } catch(error) {
            toastr.error("Falha ao efeutar login, tente novamente");
        }
    }

    async function handleCadastrar(e) {
        e.preventDefault();

        const data = {
            nome: cadNome,
            email: cadEmail
        }

        try {
            const response = await api.post('/usuario', data);
            if(response.status === 201) {
                toastr.success(response.data.message);
                setcadEmail("");
                setcadNome("");
            }
            console.log(response);


        } catch(error) {
            toastr.error("Falha ao cadastrar, tente novamente");
        }
    }
    return (
        <div className="containerForm">
            <section className="fundo">
                <Form className="espacamentoDireita" onSubmit={handleCadastrar}>
                    <h2>Cadastre-se</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Insira seu e-mail" 
                            value={cadEmail}
                            onChange={e => setcadEmail(e.target.value)}
                            required
                        />
                        <Form.Text className="text-muted">
                            Nunca compartilharemos seu email com mais ninguém
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Insira seu nome" 
                            value={cadNome}
                            onChange={e => setcadNome(e.target.value)}
                            required
                        />
                    </Form.Group>                   
                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                </Form>

                <Form className="espacamentoEsquerda" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Insira seu e-mail" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <Form.Text className="text-muted">
                            Nunca compartilharemos seu email com mais ninguém
                        </Form.Text>
                    </Form.Group>                    
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
            </section>
        </div>
    );
}