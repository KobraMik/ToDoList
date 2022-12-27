import React, {useEffect} from 'react'
import {TodolistsList} from './components/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './redux/store'
import {RequestStatusType} from './redux/app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from './features/ErrorSnackbar/ErrorSnackbar'
import {Link, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import {getAuthUserData, authStateType, logout} from './redux/auth-reducer';

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const {isAuth} = useSelector<AppRootStateType, authStateType>((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [])

    return (
        <>
            <ErrorSnackbar/>
            <AppBar position="relative">
                <Container fixed>
                    <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Link to={'/login'} style={{color: 'white', textDecoration: 'none'}}>
                            {isAuth &&
                                <Button color="inherit" variant="outlined"
                                        onClick={() => {
                                            dispatch(logout())
                                        }}
                                >Logout</Button>}
                        </Link>
                    </Toolbar>
                    {status === 'loading' &&
                        <LinearProgress style={{
                            position: 'absolute',
                            bottom: '-4px',
                            width: '100%'
                        }}/>
                    }
                </Container>
            </AppBar>
            <Container fixed style={{margin: '20px auto'}}>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Container>
        </>
    )
}

export default App
