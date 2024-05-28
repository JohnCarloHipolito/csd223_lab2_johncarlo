import React, {useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import useStore from "../stores/store";
import {updateUser} from "../stores/repository";
import TransactionTable from "../components/TransactionTable";

function TransactionPage({type}) {
    const {user} = useStore();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const location = useLocation();

    useEffect(() => {
        reset();
    }, [location, reset]);

    const onSubmit = (data) => {
        switch (type) {
            case 'deposit':
                doDeposit(data.amount);
                break;
            case 'withdrawal':
                doWithdrawal(data.amount);
                break;
            default:
                alert('Invalid transaction type');
                break;
        }
    };

    const getLatestBalance = () => {
        const transactions = user.About.Accounts.Saving.Transactions;
        if (transactions.length === 0) {
            return 0;
        } else {
            return user.About.Accounts.Saving.Transactions[user.About.Accounts.Saving.Transactions.length - 1].Balance;
        }
    };

    const doDeposit = async (amount) => {
        const depositAmount = parseFloat(amount);
        const latestBalance = getLatestBalance() + depositAmount;
        user.About.Accounts.Saving.Transactions.push({
            '@type': "Transaction",
            Description: 'Deposit',
            Date: new Date().toISOString(),
            Amount: depositAmount,
            Balance: latestBalance
        });
        await updateUser(user);
    };

    const doWithdrawal = async (amount) => {
        const withdrawalAmount = parseFloat(amount);
        let latestBalance = getLatestBalance() - withdrawalAmount;

        if (latestBalance < 0) {
            alert('Insufficient balance for withdrawal');
            return false;
        } else {
            user.About.Accounts.Saving.Transactions.push({
                '@type': "Transaction",
                Description: 'Withdrawal',
                Date: new Date().toISOString(),
                Amount: withdrawalAmount,
                Balance: latestBalance
            });

            await updateUser(user);
            return true;

        }
    };

    return (
        <div className="container-fluid p-4 gap-4 d-flex flex-column flex-lg-row justify-content-lg-around align-items-center align-items-lg-start">
            <div>
                <h3 className="text-center text-lg-start text-primary">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <Form onSubmit={handleSubmit(onSubmit)} style={{width: '375px'}}>
                    <Form.Group controlId="formAccountNumber" className="mb-4">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control type="text" disabled defaultValue={user.About.Accounts.Saving.AccountNumber} {...register('account', {})}/>
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
                <div className="text-center flex-fill text-lg-start mb-2">Available balance ${getLatestBalance().toFixed(2)}</div>
                <TransactionTable/>
            </div>
        </div>
    );
}

export default TransactionPage;