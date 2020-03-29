import React from "react";
import {Switch, Route} from 'react-router-dom';
import Authentication from "./authentication";
import CreateTransaction from "./transaction/CreateTransaction";
import GlobalTable from "./globalTable";
import useLocalStorage from "../hooks/useLocalStorage";
export default () => {
    const [token] = useLocalStorage('tokenId');
    return (
        <Switch>
            <Route path="/" component={GlobalTable} exact />
            <Route path="/login" component={Authentication} />
            {token && <Route path="/create" component={CreateTransaction} />}
        </Switch>
    )
}