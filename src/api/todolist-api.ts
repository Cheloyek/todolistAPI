import axios from "axios";

type TodolistType = {
        "id": string,
        "title": string,
        "addedDate": Date,
        "order": number
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
    getTodolist() {
        // return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    deleteTodolist(todoId: string) {
        // return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    getTasksFromTodolist(todoId: string) {
        return instance.get(`/todo-lists/${todoId}/tasks`)
    },
    createTask() {
        
    }

}