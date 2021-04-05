import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route
 } from 'react-router-dom';
 import AddFuncionarios from '../pages/AddFuncionarios/AddFuncionarios';
 import ListFuncionarios from '../pages/ListFuncionarios/ListFuncionarios';

const route = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={ListFuncionarios} exact/>
                <Route path="/add" component={AddFuncionarios} />
            </Switch>
        </Router>
    );
};

export default route;