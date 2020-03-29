import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {showAlert} from "../../redux/actions";
import {Alert} from "../../components/Alert";
import useLocalStorage from "../../hooks/useLocalStorage";

const Authentication = ({showAlert, alert}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccessFullSubmit, setisSuccessFullSubmit] = useState(false);
    const [token,] = useLocalStorage('tokenId');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email.trim() && password.trim()) {
            setEmail('');
            setPassword('');
            showAlert('Успешно залогинен', 'success');
            setisSuccessFullSubmit(true);
        } else {
            setTimeout(() => {
                showAlert('Введите email или пароль', 'warning');
            }, 100);
        }
    };

    const randomToken = Math.floor(Math.random() * 1000);

    useEffect(() => {
        if(!isSuccessFullSubmit) return;
        localStorage.setItem('tokenId', randomToken)
    },[isSuccessFullSubmit, randomToken]);

    if(isSuccessFullSubmit) {
        return <Redirect to={'/'}/>
    }

    if(token) {
        return <Redirect to={'/'}/>
    }

    return(
        <div className="auth-page mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Авторизация</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            {alert && <Alert text={alert.text} type={alert.type}/>}
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-lg btn-primary btn-block"
                            >
                                войти
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    showAlert
};

const mapStateToProps = (state) => ({
    alert: state.app.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);