import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Container, Form, Image} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import signupImage from '../images/signup.jpg';
import {createBody, storeHeader, storeUrl} from "../stores/jsonStore";

function SignupPage() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = formData => {
        if (errors.name || errors.email || errors.password) {
            console.log(errors);
        } else {
            createAccount(formData);
            createCredential(formData);
        }
    };

    const createAccount = async (formData) => {
        const body = createBody();
        body.Result.Name = formData.email;
        body.Result.About = {};
        body.Result.About['@type'] = "Account";
        body.Result.About.Account = generateAccount();

        fetch(storeUrl, {
            method: 'POST',
            headers: storeHeader,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ActionStatus === 'CompleteActionStatus') {
                    console.log('Account created');
                } else {
                    alert('Invalid email or password. Please try again.');
                    reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    const createCredential = async (formData) => {
        const body = createBody();
        body.Result.Name = formData.email;
        body.Result.About = {};
        body.Result.About['@type'] = "Credential";
        body.Result.About.Password = formData.password;

        fetch(storeUrl, {
            method: 'POST',
            headers: storeHeader,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ActionStatus === 'CompleteActionStatus') {
                    console.log('Credential created');
                    navigate('/login');
                } else {
                    alert('Invalid email or password. Please try again.');
                    reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const generateAccount = () => {
        const time = new Date(Date.now());
        const yy = time.getFullYear().toString().slice(-2);
        const mm = ('0' + (time.getMonth() + 1)).slice(-2);
        const dd = ('0' + time.getDate()).slice(-2);
        const hh = ('0' + time.getHours()).slice(-2);
        const mn = ('0' + time.getMinutes()).slice(-2);
        const ss = ('0' + time.getSeconds()).slice(-2);

        return `${yy}${mm}${dd}${hh}${mn}${ss}`;
    };

    return (
        <div className="container-fluid p-4 gap-4 d-flex flex-column flex-lg-row justify-content-lg-around align-items-center align-items-lg-start">
            <div>
                <h3 className="mb-4 text-primary">Signup</h3>
                <Form onSubmit={handleSubmit(onSubmit)} style={{width: '375px'}}>
                    <Form.Group controlId="formBasicName" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" autoComplete="off" {
                            ...register('name', {
                                required: true
                            })} />
                        {errors.name && <p className="text-danger mt-1">Name is required.</p>}
                    </Form.Group>

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
                        Signup
                    </Button>
                </Form>
            </div>
            <div className="image-side">
                <Image src={signupImage} alt={"Signup"}/>
            </div>
        </div>
    );
}

export default SignupPage;