import React from 'react';
import {Formik} from 'formik';
import {authStateType, login} from '../../redux/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {Navigate} from 'react-router-dom';
import style from './Login.module.css'
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from '@mui/material';

const Login = () => {
    const dispatch = useDispatch()
    const {isAuth, captchaUrl, error} = useSelector<AppRootStateType, authStateType>((state) => state.auth)

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={style.container}>
            <div className={style.text}>Hello! You can register<a href="https://social-network.samuraijs.com/"
                                                                  target="_blank">here</a>
                or use this data to log in:
                <div className={style.dataText}>
                    <div>Email: <span>free@samuraijs.com</span></div>
                    <div>Password: <span>free</span></div>
                </div>
            </div>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false, captchaUrl: undefined}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        // @ts-ignore
                        errors.email = 'Required';
                    }
                }}
                onSubmit={(values) => {
                    dispatch(login(values.email, values.password, values.rememberMe, values.captchaUrl))
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={style.textFild}>Your email</div>
                        <TextField
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />

                        {errors.email && touched.email && errors.email}
                        <div className={style.textFild}>Your password</div>
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />

                        {errors.password && touched.password && errors.password}
                        <FormGroup>
                            <FormControlLabel control={<Checkbox
                                name="rememberMe"
                                onChange={handleChange}
                                checked={values.rememberMe}
                            />} label="Remember me"/>
                        </FormGroup>

                        {captchaUrl && <div>
                            <p style={{textAlign: 'center'}}><img src={captchaUrl} alt="captcha"/></p>
                            <TextField
                                type="text"
                                name="captchaUrl"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.captchaUrl}
                            />

                        </div>}

                        {error &&
                            <div style={{
                                border: '#f32020 2px solid',
                                padding: '10px',
                                color: '#fc8d8d',
                                borderRadius: '7px',
                                margin: '10px 0'
                            }}><p style={{textAlign: 'center', margin: '0'}}>{error}</p></div>
                        }
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Login;