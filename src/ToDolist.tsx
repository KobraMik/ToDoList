import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    minusTask: (id: string) => void
    setFilters: (value: 'All' | 'Active' | 'Completed') => void
    plusTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const addTaskHadler = () => {
        props.plusTask(title)
        setTitle('')
    }

    const onChangeHadler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHadler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHadler()
        }
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHadler}
                   value={title}
                   onKeyPress={onKeyPressHadler}/>
            <button onClick={addTaskHadler}>+</button>
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
            <button onClick={() => props.setFilters('All')}>All</button>
            <button onClick={() => props.setFilters('Active')}>Active</button>
            <button onClick={() => props.setFilters('Completed')}>Completed</button>
        </div>
    </div>
}
