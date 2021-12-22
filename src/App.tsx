import React, {useState} from 'react';
import './App.css';
import {filterValueType, Todolist} from './ToDolist';
import {v1} from "uuid";


function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(f => f.id !== id))
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeStatusCheckBox = () => {
        console.log('wtf')
    }

    let [filter, setMyFilter] = useState<filterValueType>('All')

    let newTasks = tasks;
    // newTasks = filter === 'All' ? tasks1:filter === 'Active' ? tasks1.filter(f=>!f.isDone):filter==='Completed' ? tasks1.filter(f=>f.isDone):tasks1
    if (filter === 'Active') {
        newTasks = tasks.filter(f => f.isDone)
    } else if (filter === 'Completed') {
        newTasks = tasks.filter(f => !f.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={newTasks}
                      minusTask={removeTask}
                      setFilters={setMyFilter}
                      plusTask={addTask}
                      changeStatusHandler={changeStatus}
            />
        </div>
    );
}

export default App;
