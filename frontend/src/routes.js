import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import minhasMensagens from './pages/mensagensUsuario';
import NotFound from './pages/NotFound'

const Permissao = ({ component : Component}) => (
    <Route
            render={props => localStorage.getItem("email") ? (
                <Component {...props} />
            ) 
            : 
            (
                <Redirect to={{ pathname: "/" }} />
            )
        }
    />
)

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                    <Route path="/" exact component={Login}/>
                    <Permissao exact path="/home" component={Home}/>                   
                    <Permissao exact path="/mensagensUsuario" component={minhasMensagens}/>
                    <Permissao component={NotFound}/>

            </Switch>        
        </BrowserRouter>
    );
};