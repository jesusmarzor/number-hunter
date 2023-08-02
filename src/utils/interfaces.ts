import { LucideIcon } from "lucide-react"

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
    icon: LucideIcon
    minNumber: number
    maxNumber?: number
}