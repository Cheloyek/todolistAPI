import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        todolistAPI.getTodolists()
            .then( (res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'list'}, settings)
        todolistAPI.createTodolist('TODOLIST 3')
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'c9da495b-f7e8-48d6-b42d-743b4013c98a'
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
            todolistAPI.deleteTodolist(todoId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'c9da495b-f7e8-48d6-b42d-743b4013c98a'

        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {title: 'updateList'}, settings)
        todolistAPI.updateTodolist(todoId, 'updateListTitle')
            .then(res => {
                setState(res.data.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState(null)
    const [todoId, setTodoId] = useState<string>('')
    // const todoId = '77fad263-ec6c-4bcf-b4c5-b9c41553407b'
    const getAllTasks = () => {
        // todolistAPI.getTasksFromTodolist(todoId)
        //     .then( (res) => {
        //         setState(res.data)
        //     })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todoId'} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}}/>
        <button onClick={getAllTasks}>get tasks</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState(null)
    const [todoId, setTodoId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    // const todoId = '77fad263-ec6c-4bcf-b4c5-b9c41553407b'
    // const title = 'taks 3'
    const createNewTask = () => {
        todolistAPI.createTask(todoId, title)
            .then((res) => {
                setState(res.data.data)
            })
    }


    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todoId}
        onChange={(e) => {setTodoId(e.currentTarget.value)}}/>
        <input placeholder={'Task title'} value={title}
        onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={createNewTask}>create task</button>
    </div></div>
}

export const UpdateThisTask = () => {
    const [state, setState] = useState(null)
    const todoId = 'c9da495b-f7e8-48d6-b42d-743b4013c98a'
    const taskId = '1d2d082b-8bd4-4b5e-92a2-7867f4b8f7f3'
    const title = 'Changed title'
    const description = 'This title have been changed'
    const priority = 7
    const startDate = '5.12.2022'
    const deadline = '6.12.2099'
    // useEffect( () => {
    //     todolistAPI.updateTask( todoId, taskId, title, description, priority, startDate, deadline)
    // }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteThisTask = () => {
    const [state, setState] = useState(null)
    const todoId = '77fad263-ec6c-4bcf-b4c5-b9c41553407b'
    const taskId = 'd7c2bbd1-8ce4-4417-91c2-5cd1efc87fb4'
    useEffect( () => {
        todolistAPI.deleteTask(todoId, taskId)
    })
    return <div>task {taskId} have been delete from todolist {taskId}</div>
}
