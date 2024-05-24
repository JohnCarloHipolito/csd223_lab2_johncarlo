import React, {useEffect} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import TransactionTable from "../components/TransactionTable";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import useStore from "../stores/store";
import {createBody, readBody, storeHeader, storeUrl} from "../stores/jsonStore";

function TransactionPage({type}) {
    const {account, userEmail, balance, setBalance, transactions, setTransactions} = useStore();
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm();
    const formFields = watch();
    const location = useLocation();

    useEffect(() => {
        getLatestBalance();
        reset();
    }, [location, reset]);

    const getLatestBalance = () => {
        const body = readBody();
        body.Object.FilterItem.Name = userEmail;
        body.Object.FilterItem.About = {};
        body.Object.FilterItem.About['@type'] = "Transaction";

        fetch(storeUrl, {
            method: 'POST',
            headers: storeHeader,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.Result.NumberOfItems > 0) {
                    setBalance(parseFloat(data.Result.ItemListElement[data.Result.NumberOfItems - 1].Item.About.Balance));
                } else {
                    setBalance(0);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const doDeposit = (account, amount, type) => {
        getLatestBalance();
        const depositAmount = parseFloat(amount);
        const latestBalance = balance + depositAmount;

        const body = createBody();
        body.Result.Name = userEmail;
        body.Result.About = {
            '@type': "Transaction",
            Type: type,
            Date: new Date().toISOString().split('T')[0],
            Amount: amount,
            Balance: latestBalance
        };

        fetch(storeUrl, {
            method: 'POST',
            headers: storeHeader,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ActionStatus === 'CompleteActionStatus') {
                    setBalance(latestBalance);
                } else {
                    alert('Error has occured');
                    reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const doWithdrawal = (account, amount, type) => {
        getLatestBalance();
        const withdrawalAmount = parseFloat(amount);
        let latestBalance = balance - withdrawalAmount;

        if (latestBalance < 0) {
            alert('Insufficient balance for withdrawal');
            return false;
        } else {
            const body = createBody();
            body.Result.Name = userEmail;
            body.Result.About = {
                '@type': "Transaction",
                Type: type,
                Date: new Date().toISOString().split('T')[0],
                Amount: amount,
                Balance: latestBalance
            };

            fetch(storeUrl, {
                method: 'POST',
                headers: storeHeader,
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.ActionStatus === 'CompleteActionStatus') {
                        setBalance(latestBalance);
                        return true;
                    } else {
                        alert('Error has occured');
                        reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const doTransfer = (fromAccount, toAccount, amount) => {
        if (doWithdrawal(fromAccount, amount, 'transfer - debit')) {
            doDeposit(toAccount, amount, 'transfer - credit');
        }
    };

    const onSubmit = (data) => {

        switch (type) {
            case 'deposit':
                doDeposit(data.account, data.amount, type);
                break;
            case 'withdrawal':
                doWithdrawal(data.account, data.amount, type);
                break;
            default:
                alert('Invalid transaction type');
                break;
        }
    };

    return (
        <div className="container-fluid p-4 gap-4 d-flex flex-column flex-lg-row justify-content-lg-around align-items-center align-items-lg-start">
            <div>
                <h3 className="text-center text-lg-start text-primary">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <Form onSubmit={handleSubmit(onSubmit)} style={{width: '375px'}}>
                    <Form.Group controlId="formAccountNumber" className="mb-4">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control type="text" disabled defaultValue={account} {
                            ...register('account', {})}/>
                    </Form.Group>

                    <Form.Group controlId="formTransactionAmount" className="mb-4">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" {
                            ...register('amount', {
                                required: true,
                                pattern: /^(1000|1000.00|[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?)$/
                            })}/>
                        {errors.amount && <p className="text-danger mt-1">Valid amount is between 1 and 1000 up to two decimal places.</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Submit
                    </Button>
                </Form>
            </div>
            <div className="flex-fill">
                <h3 className="text-center text-lg-start text-primary">Transaction History</h3>
                <div className="text-center flex-fill text-lg-start mb-2">Available balance ${balance.toFixed(2)}</div>
                {/*<TransactionTable account={formFields.account} key={formFields.account}/>*/}
            </div>
        </div>
    );
}

export default TransactionPage;