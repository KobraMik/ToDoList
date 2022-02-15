import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {AppRootStateType} from "./state/ store";
import {TasksStateType, TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
  }

export function TodolistWithRedux(props: PropsType) {

    const todolists = useSelector<AppRootStateType, TodolistType>(state => state.todolists
        .filter(todo=>todo.id === props.id)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(removeTaskAC(title, props.id))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(title, props.id))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "active"))
    const onCompletedClickHandler = () =>dispatch(changeTodolistFilterAC(props.id, "completed"))

    return <div>
        <h3> <EditableSpan value={todolists.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                       dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={todolists.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={todolists.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolists.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


