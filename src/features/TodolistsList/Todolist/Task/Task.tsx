import React, {useCallback} from 'react'
import {EditableText} from '../../../../components/EditableSpan/EditableText'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {removeTaskTC, updateTaskTC} from '../../tasks-reducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => dispatch(removeTaskTC(id, todolistId)), [task.id, todolistId])
    const onTitleChangeHandler = useCallback((newValue: string) => dispatch(updateTaskTC(task.id, {title: newValue}, todolistId)), [task.id, todolistId]);
    const changeStatus = useCallback((taskId: string, checked: boolean, todolistId: string) => {
        let status = checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [task.id, todolistId])

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={(e) => {
                changeStatus(task.id, e.currentTarget.checked, todolistId)
            }}
        />
        <EditableText value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={() => removeTask(task.id, todolistId)}>
            <Delete/>
        </IconButton>
    </div>
})
