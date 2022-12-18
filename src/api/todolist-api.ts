import axios from "axios";
import {FilterValuesType} from "../App";

export type TodolistType = {
        id: string,
        title: string,
        addedDate: string,
        order: number
        filter: FilterValuesType
    }

type CreateTodolistType = {
    resultCode: number
    messages: string[],
    data: {
        item: TodolistType
    }
}

type UpdateTodolistType = {
    resultCode: number
    messages: Array<string>
    data: {}
    "fieldsErrors": string[]
}
type DeleteTodolistType = {
    resultCode: number
    messages: Array<string>
    data: {}
    "fieldsErrors": string[]
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        // const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },

    createTodolist(title: string) {
        // return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    },
    getTodolists() {
        // return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    deleteTodolist(todoId: string) {
        // return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    getTasksFromTodolist(todoId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<any>(`todo-lists/${todoId}/tasks`, {title: title})
    },
    updateTask(todoId: string,taskId: string,  title: string, description: string, priority: number, startDate: string, deadline: string) {
        return instance.put<any>(`todo-lists/${todoId}/tasks/${taskId}`, {title: title, description: description, completed: false, status: 0, priority: priority, startDate: startDate, deadline: deadline, addedDate: Date})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<any>(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}
