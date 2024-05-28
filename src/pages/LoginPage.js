import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Form, Image} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import useStore from "../stores/store";
import loginImage from '../images/login.jpg';
import {readUser} from "../stores/repository";


function LoginPage() {
    const {setUser} = useStore();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        if (errors.email || errors.password) {
            console.log(errors);
        } else {
            const {success, user} = await readUser(formData.email);
            if (success && user.About.Password === formData.password) {
                console.log('Login successful.');
                user.Creator.Identifier = 'Admin';
                setUser(user);
                navigate('/');
            } else {
                alert('Invalid email or password. Please try again.');
            }
        }
    };

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