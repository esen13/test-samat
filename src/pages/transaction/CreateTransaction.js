import React, {useState} from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {addTransaction, showAlert} from "../../redux/actions";
import {Alert} from "../../components/Alert";
import useLocalStorage from "../../hooks/useLocalStorage";

const CreateTransaction = ({showAlert, alert, addTransaction}) => {

    const [amount, setAmount] = useState('');
    const [bankId, setBankId] = useState('1');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (amount.trim()) {
            addTransaction(amount, bankId)
                .then(() =>{
                    showAlert('Транзакция была создана', 'success');
                })
                .catch(() => {
                    showAlert('Транзакция не была создана', 'danger');
                });
            setAmount('');
            setBankId('1');
        } else {
            setTimeout(() => {
                showAlert('Введите название', 'warning');
            }, 100);
        }
    };

    return(
        <div className="create-transaction-page mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Создать транзакцию</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            {alert && <Alert text={alert.text} type={alert.type} />}
                            <div className="form-group">
                                <label htmlFor="exampleInputSum">Сумма</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputSum"
                                    value={amount}
                                    onChange={event => setAmount(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Выберите банк</label>
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    value={bankId}
                                    onChange={event => setBankId(event.target.value)}
                                >
                                    <option value="1">Бай тушум</option>
                                    <option value="2">Оптима банк</option>
                                    <option value="3">КИКБ</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="btn-lg btn-primary btn-block"
                            >
                                отправить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    addTransaction,
    showAlert
};

const mapStateToProps = (state) => ({
    alert: state.app.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);