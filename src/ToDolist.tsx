import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    minusTask: (id:number) => void
    setFilterFilter: (value: string) => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
        </div>
        {props.tasks.map(m => {
            return (
                <li key={m.id}>
                    <input type="checkbox"
                           checked={m.isDone}/>
                    <span>{m.title}</span>
                    <button onClick={() => props.minusTask(m.id)}>X</button>
                </li>
            )
        })}
        <div>
            <button onClick={() => props.setFilterFilter('All')}>All</button>
            <button onClick={() => props.setFilterFilter('Active')}>Active</button>
            <button onClick={() => props.setFilterFilter('Completed')}>Completed</button>
        </div>
    </div>
}
