import { ResultType } from "./enums"

export interface UserList<T> {
    channel: string,
    users: T
}

export interface User {
    username: string
    lifes: number
}

export interface WinnerUser {
    username: string
    points: number
}

export interface NumberResult {
    type: ResultType
    minNumber: number
    maxNumber?: number
}