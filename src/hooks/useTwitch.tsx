import { useEffect, useState } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"
import { UserType } from "@/utils/enums"
import { User } from "@/utils/interfaces"
import { usernameDefault } from "@/utils/constants"
import tmi from "tmi.js"

interface props {
    channel: string
}

const useTwitch = ({ channel }: props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [winnerUser, setWinnerUser] = useState<User | null>(null)
    const { getUser, setUser, removeUser } = useLocalStorage()

    useEffect(() => {
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
            if (self || tags.username === getUser(UserType.current)?.username) return;
            let newNumber = Number(message)
            if (newNumber) {
                if ((newNumber === (Number(getUser(UserType.current)?.number ?? 0) + 1))) {
                    newNumber > Number(getUser(UserType.winner)?.number) && setWinnerUser(null)
                    let currentUser = {
                        channel: channel,
                        username: tags.username ?? usernameDefault,
                        number: message
                    }
                    setCurrentUser(currentUser)
                    setUser(UserType.current, currentUser)
                } else {
                    let winnerNumber = Number(getUser(UserType.winner)?.number)
                    if (!winnerNumber || channel !== getUser(UserType.winner)?.channel || Number(getUser(UserType.current)?.number) > winnerNumber) {
                        let winnerUser = getUser(UserType.current)
                        if (winnerUser) {
                            setWinnerUser(winnerUser)
                            setUser(UserType.winner, winnerUser)
                        }
                    }
                    setCurrentUser(null)
                    removeUser(UserType.current)
                }
            }
        });
    }, [])

    return { currentUser, winnerUser }
}

export default useTwitch