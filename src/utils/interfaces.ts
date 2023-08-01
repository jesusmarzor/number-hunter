import { ResultType } from "./enums"

export interface User {
    channel: string
    username: string
    number: string
    resultType: string
}

export interface NumberResult {
    type: ResultType
    minNumber: number
    maxNumber: number
}