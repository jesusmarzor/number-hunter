import { User, UserList, WinnerUser } from "@/utils/interfaces"

interface returnObject {
    getUsers: (dataType: string) => (UserList<User[] | WinnerUser[]> | null)
    setUsers: (dataType: string, users: UserList<User[] | WinnerUser[]>) => void
    removeUsers: (dataType: string) => void
}

const useLocalStorage = (): returnObject => {
    const getUsers = (dataType: string): (UserList<User[] | WinnerUser[]> | null) => {
        let users = localStorage.getItem(dataType)
        return users ? JSON.parse(users) : null
    }

    const setUsers = (dataType: string, users: UserList<User[] | WinnerUser[]>) => {
        localStorage.setItem(dataType, JSON.stringify(users))
    }
    
    const removeUsers = (dataType: string) => {
        localStorage.removeItem(dataType)
    }

    return { getUsers, setUsers, removeUsers }
}

export default useLocalStorage