import { LucideIcon } from "lucide-react"
import tmi from "tmi.js"

export interface UserList<T> {
    channel: string,
    users: T
}

export interface User {
    username: string
    lives: number
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

export interface Properties {
    lives: number
    setLives: React.Dispatch<React.SetStateAction<number>>
    maxNumber: number
    setMaxNumber: React.Dispatch<React.SetStateAction<number>>
}

export interface Client {
    connectClient: (channel: string, completion: (channel: string, tags: tmi.ChatUserstate, message: string, self: boolean) => void) => void
    disconnectClient: () => void
}

export interface FormErrors {
    channel?: string
    lives?: string
    maxNumber?: string
}