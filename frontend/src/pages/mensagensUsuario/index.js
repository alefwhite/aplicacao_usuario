import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Header from '../../assets/components/Header'
import {Jumbotron, Card, Container, CardGroup} from 'react-bootstrap';
import toastr from 'toastr';
import { FiTrash2 } from 'react-icons/fi';


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
    const [mensagens, setMensagens] = useState([]);

    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");
    
    useEffect(() => {
        api.get(`/usuarioMensagem/${email}`)
        .then(response => {
            setMensagens(response.data.mensagens);
        });

    }, [email]);
       

    async function handleDeleteMensagem(id) {
        try {
            await api.delete(`/mensagem/${id}`);
            toastr.success("Sua mensagem foi deletada com sucesso!");
            setMensagens(mensagens.filter(msg => msg._id !== id));

       } catch(erro) {
           alert('Erro ao deletar caso, tente novamente.')
       }
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
                    <h3>{mensagens.length > 0 ? "Nesta página você pode visualizar e deletar suas mensagens" : "Você não possui mensagens neste momento!"}</h3>                    
                </Container>
            </Jumbotron>
            
            {mensagens.map(msg =>(
                <CardGroup className="espacamento" style={{marginTop: "30px"}} key={msg._id}>
                    <Card border="primary" style={{ width: '18rem' }}>
                        <Card.Header className="espacamento" style={{display: "flex", justifyContent: "space-between"}}>
                            {msg.email}
                            <button type="button" onClick={() => handleDeleteMensagem(msg._id)}>
                                <FiTrash2 size={20} color="#B22222"/>
                            </button>
                        </Card.Header>
                        <Card.Body>
                        <Card.Title>Username - {msg.nome.toUpperCase()}</Card.Title>
                        <Card.Text>
                           Data - {FormatarData(msg.data)}                          
                        </Card.Text>                       
                        <Card.Text>
                           Mensagem: {msg.mensagem}                          
                        </Card.Text>                       
                        </Card.Body>
                    </Card>                
                </CardGroup>
            ))}
            
        </>
    );
}