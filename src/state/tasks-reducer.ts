import {TaskPriorities, TaskStatuses, TaskType} from '../Todolist';
import { v1 } from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import { TasksStateType } from '../App';
import {todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state}
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     todoListId: action.todolistId, description: '',
            //     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            // }
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
            //
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOS': {
            let copyState = {...state}
            action.todoLists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todoListId]: action.tasks
            }
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, isDone: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', tasks, todoListId} as const)

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasksFromTodolist(todoListId)
    .then((res) => {
        dispatch(setTasksAC(todoListId, res.data.items))
    })
}


export const removeTasksTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId,todoListId))
            }
        })
        .catch((e) => {
            console.log(e.message)
        })
}

export const addTasksTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todoListId, title)
        .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
        })
}

export const updateTaskTC = (todoListId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find((t) => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            status: status
        }
        todolistAPI.updateTask(todoListId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, res.data.data.item.status, todoListId))
            })
    }

}
