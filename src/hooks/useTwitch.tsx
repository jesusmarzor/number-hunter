import { useEffect, useState } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"
import { ResultType, UserType } from "@/utils/enums"
import { User } from "@/utils/interfaces"
import { leftZeros, resultsNumber, usernameDefault } from "@/utils/constants"
import tmi from "tmi.js"
import getRandomNumber from "@/utils/getRandomNumber"

interface props {
    maxNumber: number
    channel: string
}

const useTwitch = ({ maxNumber, channel }: props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [winnerUser, setWinnerUser] = useState<User | null>(null)
    const { getUser, setUser, removeUser } = useLocalStorage()

    const saveCurrentUser = (channel: string, number: number, resultType: ResultType, username?: string) => {
        let currentUser = {
            channel: channel,
            username: username ?? usernameDefault,
            number: String(number),
            resultType: resultType
        }
        setCurrentUser(currentUser)
        setUser(UserType.current, currentUser)
    }

    const resetGame = () => {
        setCurrentUser(null)
        removeUser(UserType.current)
    }

    useEffect(() => {
        localStorage.setItem("randomNumber", String(getRandomNumber(maxNumber)))
        removeUser(UserType.current)
        let winnerUser = getUser(UserType.winner)
        if (winnerUser && winnerUser.channel === channel) {
            setWinnerUser(getUser(UserType.winner))
        }
        const client = tmi.client({
            channels: [channel]
        })
        client.connect()
        client.on('message', (channel, tags, message, self) => {
            let randomNumber = Number(localStorage.getItem("randomNumber"))
            if (self || tags.username === getUser(UserType.current)?.username || !randomNumber) return;
            let newNumber = Number(message.replace(leftZeros, ''))
            if (newNumber || newNumber === 0) {
                let distance: number = Math.abs(randomNumber - newNumber)
                if (distance === 0) {
                    resetGame()
                    localStorage.setItem("randomNumber", String(getRandomNumber(maxNumber)))
                } else {
                    let resultType = ResultType.cold
                    resultsNumber.forEach( ({type, minNumber, maxNumber}) => {
                        if (distance >= minNumber && distance <= maxNumber) {
                            resultType = type
                        }
                    })
                    console.log(tags.username, resultType)
                    saveCurrentUser(channel, newNumber, resultType, tags.username )
                }
            }
        });
    }, [])

    return { currentUser, winnerUser }
}

export default useTwitch