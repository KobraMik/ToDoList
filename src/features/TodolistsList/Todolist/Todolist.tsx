import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import Button from '@mui/material/Button';
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../todolists-reducer'
import {useDispatch} from 'react-redux'
import {addTaskTC, fetchTasksTC} from '../tasks-reducer'
import {TitleForTodolist} from '../../../components/TitleForTodolist';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

export const Todolist = React.memo(({todolist, tasks}: PropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    const addTask = useCallback((title: string) => dispatch(addTaskTC(title, todolist.id)), [todolist.id])
    const removeTodolist = useCallback((id: string) => dispatch(removeTodolistTC(id)), [todolist.id])
    const changeTodolistTitle = useCallback((title: string) => dispatch(changeTodolistTitleTC(todolist.id, title)), [todolist.id])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => dispatch(changeTodolistFilterAC(todolistId, value)), [])

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [todolist.id, changeFilter])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <>
        <TitleForTodolist value={todolist.title} onChange={changeTodolistTitle} id={todolist.id}
                          entityStatus={todolist.entityStatus}
                          removeTodolist={removeTodolist}/>
        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
            >
                All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>
                Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'primary'}>
                Completed
            </Button>
        </div>
    </>
})


