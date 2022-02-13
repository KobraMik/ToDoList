import {FilterValuesType, TodolistType, TasksStateType} from "../App";
import {v1} from "uuid";

type GenerealTypeForAC = firstACType | secondACType

type firstACType = ReturnType<typeof removeTaskAC>
type secondACType = ReturnType<typeof secondAC>

export const tasksReducer = (state: TasksStateType, action: GenerealTypeForAC): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)}
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

export const secondAC = () => {
    return {
        type: '',
        payload: {}
    } as const
}
