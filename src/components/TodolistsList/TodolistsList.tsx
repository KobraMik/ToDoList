import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from '../../redux/todolists-reducer'
import {TasksStateType} from '../../redux/tasks-reducer'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../features/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {authStateType} from '../../redux/auth-reducer';
import Login from '../Login/Login'

export const TodolistsList: React.FC = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const {isAuth} = useSelector<AppRootStateType, authStateType>((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [isAuth])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return <>
        {
            isAuth
                ?
                <>
                    <Grid container style={{margin: '40px 10px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container>
                        <div style={{display: 'flex'}}>
                            {todolists.map(tl => {
                                let tasksForTodolist = tasks[tl.id]

                                if (tasksForTodolist) {
                                    return <Grid item key={tl.id}>
                                        <Paper style={{padding: '10px', margin: '0 10px', minWidth: "280px"}}>
                                            <Todolist
                                                todolist={tl}
                                                tasks={tasksForTodolist}
                                            />
                                        </Paper>
                                    </Grid>
                                }
                            })
                            }
                        </div>
                    </Grid>
                </>
                :
                <Login/>
        }
    </>
}
