import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Form, Image} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import useStore from "../stores/store";
import {storeUrl, storeHeader, readBody} from "../stores/jsonStore";
import loginImage from '../images/login.jpg';


function LoginPage() {
    const {setBalance, setAccount, setUserEmail} = useStore();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = formData => {
        if (errors.email || errors.password) {
            console.log(errors);
        } else {
            const body = readBody();
            body.Object.FilterItem.Name = formData.email;
            body.Object.FilterItem.About = {};
            body.Object.FilterItem.About['@type'] = "Credential";

            fetch(storeUrl, {
                method: 'POST',
                headers: storeHeader,
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.Result.NumberOfItems > 0
                        && data.Result.ItemListElement[0].Item.About.Password === formData.password) {
                        setUserEmail(formData.email)
                        loadAccount(formData);
                        navigate('/');
                    } else {
                        alert('Invalid email or password. Please try again.');
                        reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const loadAccount = (formData) => {
        const body = readBody();
        body.Object.FilterItem.Name = formData.email;
        body.Object.FilterItem.About = {};
        body.Object.FilterItem.About['@type'] = "Account";

        fetch(storeUrl, {
            method: 'POST',
            headers: storeHeader,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.Result.NumberOfItems > 0) {
                    setAccount(data.Result.ItemListElement[0].Item.About.Account);
                } else {
                    alert('Account not found. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div className="container-fluid p-4 gap-4 d-flex flex-column flex-lg-row justify-content-lg-around align-items-center align-items-lg-start">
            <div>
                <h3 className="mb-4 text-primary">Login</h3>
                <Form onSubmit={handleSubmit(onSubmit)} style={{width: '375px'}}>
                    <Form.Group controlId="formBasicEmail" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" autoComplete="off" {
                            ...register('email', {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                            })} />
                        {errors.email && <p className="text-danger mt-1">Email is not valid.</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="off" {
                            ...register('password', {
                                required: true
                            })} />
                        {errors.password && <p className="text-danger mt-1">Password is required.</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Login
                    </Button>
                </Form>
            </div>
            <div className="image-side">
                <Image src={loginImage} alt={"Login"}/>
            </div>
        </div>
    );
}

export default LoginPage;