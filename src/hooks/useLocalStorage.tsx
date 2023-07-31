import { User } from "@/utils/interfaces"

interface returnObject {
    getUser: (item: string) => (User | null)
    setUser: (item: string, user: User) => void
    removeUser: (item: string) => void
}

const useLocalStorage = (): returnObject => {
    const getUser = (item: string): (User | null) => {
        let user = localStorage.getItem(item)
        return user ? JSON.parse(user) : null
    }

    const setUser = (item: string, user: User) => {
        localStorage.setItem(item, JSON.stringify(user))
    }
    
    const removeUser = (item: string) => {
        localStorage.removeItem(item)
    }

    return { getUser, setUser, removeUser }
}

export default useLocalStorage