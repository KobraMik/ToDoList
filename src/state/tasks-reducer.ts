import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";

type GenerealTypeForAC = removeTaskACType | addTaskACType | changeTaskStatusACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const tasksReducer = (state: TasksStateType, action: GenerealTypeForAC): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)
            }
        }
        case 'ADD-TASK': {
            let newtask: TaskType = {id: "0", title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [newtask, ...state[action.payload.todolistID]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskID, todolistID}
    } as const
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistID}
    } as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskID, isDone, todolistID}
    } as const
}

