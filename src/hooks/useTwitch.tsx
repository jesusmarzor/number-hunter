import { useCallback, useEffect, useState } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"
import { DataType } from "@/utils/enums"
import { User, UserList, WinnerUser } from "@/utils/interfaces"
import { minNumber, leftZeros, resultsNumber, usernameDefault, confettiDuration } from "@/utils/constants"
import getRandomNumber from "@/utils/getRandomNumber"
import { LucideIcon } from "lucide-react"
import { PropertiesConsumer } from "@/contexts/propertiesContext"
import getLastIndex from "@/utils/getLastIndex"
import tmi from "tmi.js"
import { ClientConsumer } from "@/contexts/clientContext"

interface props {
    channel: string
}

const useTwitch = ({ channel }: props) => {
    const [lastValue, setLastValue] = useState<number | null>(null)
    const [userList, setUserList] = useState<UserList<User[]> | null>(null)
    const [ResultIcon, setResultIcon] = useState<LucideIcon | null>(null)
    const [winnerUserList, setWinnerUserList] = useState<UserList<WinnerUser[]> | null>(null)
    const { getUsers, setUsers, removeUsers } = useLocalStorage()
    const {lives, maxNumber} = PropertiesConsumer()
    const {connectClient} = ClientConsumer()
    const [showConfetti, setShowConfetti] = useState<boolean>(false)

    const throwConfetti = () => {
        setShowConfetti(true)
        setTimeout( () => setShowConfetti(false), confettiDuration)
    }

    const setData = useCallback((dataType: DataType, data: UserList<User[] | WinnerUser[]>) => {
        setUsers(dataType, data)
        switch (dataType) {
            case DataType.users:
                setUserList(data as UserList<User[]>)
                break

            case DataType.winnerUsers:
                setWinnerUserList(data as UserList<WinnerUser[]>)
        }
    }, [setUsers])

    const saveWinnerUser = useCallback((channel: string, username?: string) => {
        const users = getUsers(DataType.winnerUsers) as UserList<WinnerUser[]>
        const list = users?.channel === channel ? users : {channel: channel, users: []}
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
        setData(DataType.winnerUsers, list)
    }, [getUsers, setData])

    const saveCurrentUser = useCallback((channel: string, username?: string) => {
        const users = getUsers(DataType.users) as UserList<User[]>
        const list = users?.channel === channel ? users : {channel: channel, users: []}
        let currentUser = list.users.filter( ({username: nick}) => nick === username)[0]
        if (currentUser) {
            list.users = list.users.filter(({username: nick}) => nick !== username)
            currentUser.lives -= 1
        } else {
            currentUser = {
                username: username ?? usernameDefault,
                lives: lives - 1
            }
        }
        list.users.push(currentUser)
        setData(DataType.users, list)
    }, [getUsers, lives, setData])

    const removeData = useCallback((dataType: DataType) => {
        removeUsers(dataType)
        switch (dataType) {
            case DataType.users:
                setUserList(null)
                break
                
            case DataType.winnerUsers:
                setWinnerUserList(null)
        }
    }, [removeUsers])

    const resetGame = () => {
        resetRound()
        removeData(DataType.winnerUsers)
    }

    const resetRound = useCallback(() => {
        setLastValue(null)
        setResultIcon(null)
        removeData(DataType.users)
        localStorage.setItem("randomNumber", String(getRandomNumber(maxNumber)))
    }, [maxNumber, removeData])

    const loadWinners = useCallback(() => {
        const winnerUsers = getUsers(DataType.winnerUsers) as UserList<WinnerUser[]>
        if (winnerUsers && winnerUsers.users.length !== 0 && winnerUsers.channel === channel) {
            setWinnerUserList(winnerUsers)
        }
    }, [channel, getUsers])

    const clientCompletion = useCallback((channel: string, tags: tmi.ChatUserstate, message: string, self: boolean) => {
        const randomNumber = Number(localStorage.getItem("randomNumber"))
        const userList = getUsers(DataType.users) as UserList<User[]>
        const lastUser = userList?.users[getLastIndex(userList.users)]
        const currentUser = userList?.users.filter( ({username}) => username === tags?.username)[0]
        if (self || tags.username === lastUser?.username || currentUser?.lives <= 0 || !randomNumber) return;
        const newNumber = Number(message.replace(leftZeros, ''))
        if (newNumber >= minNumber && newNumber <= maxNumber) {
            const distance: number = Math.abs(randomNumber - newNumber)
            if (distance === 0) {
                throwConfetti()
                saveWinnerUser(channel, tags.username)
                resetRound()
            } else {
                setLastValue(newNumber)
                resultsNumber.forEach( ({icon, minNumber: min, maxNumber: max}) => {
                    (distance >= min && distance <= (max ?? maxNumber)) && setResultIcon(icon)
                })
                saveCurrentUser(channel, tags.username)
            }
        }
    }, [getUsers, maxNumber, resetRound, saveCurrentUser, saveWinnerUser])

    useEffect(() => {
        connectClient(channel, clientCompletion)
        resetRound()
        loadWinners()
    }, [channel, clientCompletion, connectClient, loadWinners, resetRound])

    return { userList, winnerUserList, lastValue, ResultIcon, resetGame, resetRound, showConfetti }
}

export default useTwitch