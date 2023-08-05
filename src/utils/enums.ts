export enum DataType {
    users = "users",
    winnerUsers = "winnerUsers"
}

export enum InputType {
    text = "text",
    number = "number"
}

export interface FormErrors {
    channel?: string
    lifes?: string
    maxNumber?: string
}