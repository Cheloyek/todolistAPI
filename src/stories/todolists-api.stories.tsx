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
        todolistAPI.getTodolist()
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
        todolistAPI.createTodolist('createList')
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'a13f0c27-2801-40dc-be2b-68129f94b670'
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
    useEffect( () => {
        todolistAPI.getTasksFromTodolist('c9da495b-f7e8-48d6-b42d-743b4013c98a')
            .then( (res) => {
                setState(res.data)
            })
    })
}
// export const updateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect( () => {
//
//     })
// }

