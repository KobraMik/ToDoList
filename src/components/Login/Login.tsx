import React, {useEffect} from 'react';
import {Formik} from 'formik';
import {authStateType, getAuthUserData, login} from '../../redux/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {Navigate, redirect} from 'react-router-dom';
// import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';

const Login = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector<AppRootStateType, authStateType>((state) => state.auth)

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        // <Grid container columns={6} style={{justifyContent: 'center'}}>
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    // @ts-ignore
                    errors.email = 'Required';
                }
            }}
            onSubmit={(values) => {
                dispatch(login(values.email, values.password, values.rememberMe, null))
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  // isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>Your email</div>
                    {/*<TextField*/}
                    {/*    type="email"*/}
                    {/*    name="email"*/}
                    {/*    onChange={handleChange}*/}
                    {/*    onBlur={handleBlur}*/}
                    {/*    value={values.email}*/}
                    {/*/>*/}
                    <input type="email"
                           name="email"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}/>

                    {errors.email && touched.email && errors.email}
                    <div>Your password</div>
                    {/*<TextField*/}
                    {/*    type="password"*/}
                    {/*    name="password"*/}
                    {/*    onChange={handleChange}*/}
                    {/*    onBlur={handleBlur}*/}
                    {/*    value={values.password}*/}
                    {/*/>*/}
                    <input type="password"
                           name="password"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}/>

                    {errors.password && touched.password && errors.password}
                    {/*<FormGroup>*/}
                    {/*    <FormControlLabel control={<Checkbox*/}
                    {/*        name="rememberMe"*/}
                    {/*        onChange={handleChange}*/}
                    {/*        checked={values.rememberMe}*/}
                    {/*    />} label="Remember me"/>*/}
                    {/*</FormGroup>*/}
                    <input type="checkbox"
                           name="rememberMe"
                           onChange={handleChange}
                           checked={values.rememberMe}
                    />
                    {/*<Button type="submit" variant="contained">*/}
                    {/*    Submit*/}
                    {/*</Button>*/}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
        // </Grid>
    );
};

export default Login;