import { useEffect, useState } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"
import { DataType } from "@/utils/enums"
import { User, UserList, WinnerUser } from "@/utils/interfaces"
import { leftZeros, resultsNumber, usernameDefault } from "@/utils/constants"
import tmi from "tmi.js"
import getRandomNumber from "@/utils/getRandomNumber"
import { LucideIcon } from "lucide-react"

interface props {
    channel: string
    maxNumber: number
    lifes: number
}

const useTwitch = ({ channel, maxNumber, lifes }: props) => {
    const [lastValue, setLastValue] = useState<number | null>(null)
    const [userList, setUserList] = useState<UserList<User[]> | null>(null)
    const [ResultIcon, setResultIcon] = useState<LucideIcon | null>(null)
    const [winnerUserList, setWinnerUserList] = useState<UserList<WinnerUser[]> | null>(null)
    const { getUsers, setUsers, removeUsers } = useLocalStorage()

    const saveWinnerUser = (channel: string, username?: string) => {
        let users = getUsers(DataType.winnerUsers) as UserList<WinnerUser[]>
        let list = users?.channel === channel ? users : {channel: channel, users: []}
        if (list.users.filter( ({username: nick}) => nick === username).length !== 0) {
            list.users = list.users.map( user => {
                if (user.username === username) {
                    user.points += 1
                }
                return user
            })
        } else {
            list.users.push(
                {
                    username: username ?? usernameDefault,
                    points: 1
                }
            )
        }
        setWinnerUserList(list)
        setUsers(DataType.winnerUsers, list)
    }

    const saveCurrentUser = (channel: string, username?: string) => {
        let users = getUsers(DataType.users) as UserList<User[]>
        let list = users?.channel === channel ? users : {channel: channel, users: []}
        let currentUser = list.users.filter( ({username: nick}) => nick === username)[0]
        if (currentUser) {
            list.users = list.users.filter(({username: nick}) => nick !== username)
            currentUser.lifes -= 1
        } else {
            currentUser = {
                username: username ?? usernameDefault,
                lifes: lifes - 1
            }
        }
        list.users.push(currentUser)
        setUserList(list)
        setUsers(DataType.users, list)
    }

    const resetGame = () => {
        resetRound()
        setWinnerUserList(null)
        removeUsers(DataType.winnerUsers)
    }

    const resetRound = () => {
        setLastValue(null)
        setResultIcon(null)
        setUserList(null)
        removeUsers(DataType.users)
        localStorage.setItem("randomNumber", String(getRandomNumber(maxNumber)))
    }

    useEffect(() => {
        localStorage.setItem("randomNumber", String(getRandomNumber(maxNumber)))
        removeUsers(DataType.users)
        let winnerUsers = getUsers(DataType.winnerUsers) as UserList<WinnerUser[]>
        if (winnerUsers && winnerUsers.users.length !== 0 && winnerUsers.channel === channel) {
            setWinnerUserList(winnerUsers)
        }
        const client = tmi.client({
            channels: [channel]
        })
        client.connect()
        client.on('message', (channel, tags, message, self) => {
            let randomNumber = Number(localStorage.getItem("randomNumber"))
            let userList = getUsers(DataType.users) as UserList<User[]>
            let lastUser = userList?.users[userList.users.length - 1]
            let currentUser = userList?.users.filter( ({username}) => username === tags?.username)[0]
            if (self || tags.username === lastUser?.username || currentUser?.lifes <= 0 || !randomNumber) return;
            let newNumber = Number(message.replace(leftZeros, ''))
            if (newNumber > 0 && newNumber <= maxNumber) {
                let distance: number = Math.abs(randomNumber - newNumber)
                if (distance === 0) {
                    setLastValue(null)
                    setResultIcon(null)
                    saveWinnerUser(channel, tags.username)
                    resetRound()
                } else {
                    setLastValue(newNumber)
                    resultsNumber.forEach( ({icon, minNumber: min, maxNumber: max}) => {
                        (distance >= min && distance <= (max ?? maxNumber)) && setResultIcon(icon)
                    })
                    saveCurrentUser(channel, tags.username )
                }
            }
        });
    }, [])

    return { userList, winnerUserList, lastValue, ResultIcon, resetGame, resetRound }
}

export default useTwitch