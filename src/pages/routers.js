import React from "react";
import {Switch, Route} from 'react-router-dom';
import Authentication from "./authentication";
import CreateTransaction from "./transaction/CreateTransaction";
import GlobalTable from "./globalTable";
import useLocalStorage from "../hooks/useLocalStorage";
import Logout from "../components/Logout";
export default () => {
    const [token] = useLocalStorage('tokenId');
    console.log(token, 'route')
    return (
        <Switch>
            <Route path="/" component={GlobalTable} exact />
            <Route path="/login" component={Authentication} />
            <Route path="/create" component={CreateTransaction} />
            <Route path="/logout" component={Logout} />
        </Switch>
    )
}