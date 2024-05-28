import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Form, Image} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import signupImage from '../images/signup.jpg';
import {createUser, readUser} from "../stores/repository";

function SignupPage() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async formData => {
        if (errors.name || errors.email || errors.password) {
            console.log(errors);
        } else {
            const {success, message} = await readUser(formData.email);
            if (success) {
                alert('Account already exists.');
            } else if (message === 'Account not found.') {
                const {success, message} = await createUser(formData.email, formData.password, formData.name);
                if (success) {
                    alert('Account created successfully. Redirecting to login page.');
                    reset();
                    navigate('/login');
                } else {
                    alert(message);
                }
            } else {
                alert(message);
            }
        }
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