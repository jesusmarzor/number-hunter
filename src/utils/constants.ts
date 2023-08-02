import { ResultType } from "./enums"
import { NumberResult } from "./interfaces"

export const usernameDefault = "anonymous"
export const leftZeros = /^0+/

export const resultsNumber: NumberResult[] = [
    {
        type: ResultType.hot,
        minNumber: 0,
        maxNumber: 5
    },
    {
        type: ResultType.warm,
        minNumber: 6,
        maxNumber: 10
    },
    {
        type: ResultType.cold,
        minNumber: 11
    }
]