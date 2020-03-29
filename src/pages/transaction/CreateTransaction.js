import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {addTransaction, showAlert, loadFetchBankList} from "../../redux/actions";
import {Alert} from "../../components/Alert";
import useLocalStorage from "../../hooks/useLocalStorage";
import {OptionItem} from "../../components/OptionItem";

const CreateTransaction = ({showAlert, alert, addTransaction, bankLists, loadFetchBankList}) => {

    const [amount, setAmount] = useState('');
    const [bankId, setBankId] = useState('1');

    const [token] = useLocalStorage('tokenId');

    useEffect(() => {
        if(!bankLists.length) {
            loadFetchBankList();
            console.log(bankLists, 'bankList')
        }
        // eslint-disable-next-line
    }, []);

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

    if(!token) {
        return <h5 className="text-center mt-5">Чтобы добавить транзакцию авторизуйтесь,<br/> <Link to={'/login'}> страница авторизации </Link> </h5>
    }

    const bankListsCard = bankLists.map(bankList => <OptionItem bankLists={bankList} key={bankList.id} />);

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
                                    {bankListsCard}
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
    showAlert,
    loadFetchBankList
};

const mapStateToProps = (state) => ({
    alert: state.app.alert,
    bankLists: state.transactions.bankList
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);