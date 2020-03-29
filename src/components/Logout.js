import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";

export default () => {
    useEffect(() => {
        localStorage.removeItem('tokenId')
    }, []);
    return <Redirect to={'/'}/>
}