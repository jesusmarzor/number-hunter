import { Flame, Snowflake, Sun, SunSnow } from "lucide-react"
import { NumberResult } from "@/utils/interfaces"
import { Language } from "@/utils/enums"

export const usernameDefault = "anonymous"
export const leftZeros = /^0+/

export const resultsNumber: NumberResult[] = [
    {
        icon: Flame,
        minNumber: 1,
        maxNumber: 2
    },
    {
        icon: Sun,
        minNumber: 3,
        maxNumber: 5
    },
    {
        icon: SunSnow,
        minNumber: 6,
        maxNumber: 10
    },
    {
        icon: Snowflake,
        minNumber: 11
    }
]

export const defaultLives = 3
export const minLives = 1
export const defaultMaxNumber = 10
export const minNumber = 1
export const maxNumWinners = 3
export const appName = "Number hunter"
export const jam = {
    name: "Numerica Twitch Jam",
    url: "https://itch.io/jam/numerica-twitch-jam"
}
export const creator = {
    nick: "@jesusmarzor",
    url: "https://jesusmarzor.vercel.app"
}
export const LANGUAGES: Language[] = [
    Language.ES,
    Language.EN
]
export const confettiDuration = 3000