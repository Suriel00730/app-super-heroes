import React, { useState, useContext, useEffect } from 'react';
import './Login.css'
// import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import authContext from '../contexts/authContext';
import { AUTH_TOKEN } from '../constants';
import { useHistory } from 'react-router-dom';
import fakeLoginRequest from '../helpers/fakeRequest';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const auth = useContext(authContext);
    const history = useHistory();

    useEffect(() => {
        if (auth.token) {
            history.push('/');
        }

        // eslint-disable-next-line
    }, [auth]);

    const consultApi = async (values) => {
        fakeLoginRequest(values)
            .then((data) => {
                window.location.href = '/';
                window.localStorage[AUTH_TOKEN] = JSON.stringify(data)
                setErrorMessage('')
            })
            .catch((err) => {
                setErrorMessage(err.message)
            })
        // const URL = `http://challenge-react.alkemy.org/`;
        // axios.post(URL, values)


    }

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={(values) => {
                    let errors = {}

                    if (!values.email) {
                        errors.email = 'Please enter an email';
                    }

                    if (!values.password) {
                        errors.password = 'Please enter a password';
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    consultApi(values);
                }}
            >
                {({ errors }) => (
                    <Form>

                        <div className='text-center fs-2 fw-bold'>Log in</div>
                        <div className='container-login '>
                            <div>
                                {errorMessage && <h1 style={{ border: '1px solid red', color: 'red', padding: '10px', marginBottom: '5psx' }}>{errorMessage}</h1>}
                                <div className='fs-6 fw-bold mt-3'>Email</div>
                                <Field
                                    type='text'
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    className='form-control mb-4'
                                />
                                <ErrorMessage type='email' name="email" component={() => (
                                    <div className='error text-danger'>{errors.email}</div>
                                )} />
                            </div>
                            <div>
                                <div className='fs-6 fw-bold mt-3'>Password</div>
                                <Field
                                    type='text'
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    className='form-control mb-4'
                                />
                                <ErrorMessage type='password' name="password" component={() => (
                                    <div className='error text-danger'>{errors.password}</div>
                                )} />
                            </div>
                            <button type='submit' className='button'>Login</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Login;