import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

export type filterValueType = 'All' | 'Active' | 'Completed'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    minusTask: (id: string) => void
    setFilters: (value: filterValueType) => void
    plusTask: (title: string) => void
    changeStatusHandler: (taskId: string, isDone: boolean) => void
    filter: filterValueType
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTaskHadler = () => {
        if (title.trim() !== '') {
            props.plusTask(title)
            setTitle('')
        } else {
            setError("Field is required")
        }
    }
    const onChangeHadler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHadler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (event.key === 'Enter') {
            addTaskHadler()
        }
    }
    const tsarChangeHandler = (value: filterValueType) => {
        props.setFilters(value)
    }
    const minusTaskHandler = (id: string) => {
        props.minusTask(id)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHadler}
                   value={title}
                   onKeyPress={onKeyPressHadler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHadler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {props.tasks.map(m => {
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatusHandler(m.id, e.currentTarget.checked)
                }
                return (
                    <li key={m.id}>
                        <input type="checkbox"
                               checked={m.isDone}
                               onChange={onChangeHandler}
                        />
                        <span>{m.title}</span>
                        <button onClick={() => minusTaskHandler(m.id)}>X</button>
                        {/*<button onClick={() => props.minusTask(m.id)}>X</button>*/}
                    </li>
                )

            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? "active-filter" : ""} onClick={() => tsarChangeHandler('All')}>All</button>
            <button className={props.filter === 'Active' ? "active-filter" : ""} onClick={() => tsarChangeHandler('Active')}>Active</button>
            <button className={props.filter === 'Completed' ? "active-filter" : ""} onClick={() => tsarChangeHandler('Completed')}>Completed</button>
            {/*<button onClick={() => props.setFilters('All')}>All</button>*/}

        </div>
    </div>
}
