import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: GenerealTypeForAC): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let copyState = [...state]
            return copyState.filter(tl => tl.id !== action.payload.id)
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            let newState = [...state]

            const todolist = newState.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

type GenerealTypeForAC = removeTodolistACType | addTodolisACType | changeTodolistTitleACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type addTodolisACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }
    } as const
}