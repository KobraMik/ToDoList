import React, {useState} from 'react';
import './App.css';
import {Todolist} from './ToDolist';


function App() {
    let [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false},
    ])

    const removeTask = (id: number) => {
        setTasks1(tasks1.filter(f => f.id !== id))
    }

    let [filter, setMyFilter] = useState('')

    const setFilter = (value: string) => {
        setMyFilter(value)
    }

    let newTasks = tasks1;
    // newTasks = filter === 'All' ? tasks1:filter === 'Active' ? tasks1.filter(f=>!f.isDone):filter==='Completed' ? tasks1.filter(f=>f.isDone):tasks1
    if (filter === 'Active') {
        newTasks = tasks1.filter(f => f.isDone)
    } else if (filter === 'Completed') {
        newTasks = tasks1.filter(f => !f.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={newTasks}
                      minusTask={removeTask}
                      setFilter={setFilter}
            />
        </div>
    );
}

export default App;
