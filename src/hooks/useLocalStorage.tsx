import { User, UserList, WinnerUser } from "@/utils/interfaces"
import { useCallback } from "react"

interface returnObject {
    getUsers: (dataType: string) => (UserList<User[] | WinnerUser[]> | null)
    setUsers: (dataType: string, users: UserList<User[] | WinnerUser[]>) => void
    removeUsers: (dataType: string) => void
}

const useLocalStorage = (): returnObject => {
    const getUsers = useCallback((dataType: string): (UserList<User[] | WinnerUser[]> | null) => {
        const users = localStorage.getItem(dataType)
        return users ? JSON.parse(users) : null
    }, [])

    const setUsers = useCallback((dataType: string, users: UserList<User[] | WinnerUser[]>) => {
        localStorage.setItem(dataType, JSON.stringify(users))
    }, [])
    
    const removeUsers = useCallback((dataType: string) => {
        localStorage.removeItem(dataType)
    }, [])

    return { getUsers, setUsers, removeUsers }
}

export default useLocalStorage