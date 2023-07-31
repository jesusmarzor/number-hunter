import useLocalStorage from "@/hooks/useLocalStorage"
import { usernameDefault } from "@/utils/constants"
import { useEffect, useState } from "react"
import { User } from "@/utils/interfaces"
import { UserType } from "@/utils/enums"
import tmi from "tmi.js"

const myChannel = "#jesusmarzor"

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [winnerUser, setWinnerUser] = useState<User | null>(null)
  const { getUser, setUser, removeUser } = useLocalStorage()

  useEffect( () => {
    removeUser(UserType.current)
    let winnerUser = getUser(UserType.winner)
    if (winnerUser && winnerUser.channel === myChannel) {
      setWinnerUser(getUser(UserType.winner))
    }
    const client = tmi.client({
      channels: [myChannel]
    })
    client.connect()
    client.on('message', (channel, tags, message, self) => {
      if(self || tags.username === getUser(UserType.current)?.username) return;
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
          if (!winnerNumber || Number(getUser(UserType.current)?.number) > winnerNumber) {
            let winnerUser =  getUser(UserType.current)
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

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center text-white">
      <div className="w-80 h-80 border-2 border-red-400 rounded flex flex-col justify-center items-center">
        {
          winnerUser ?
          <p>{winnerUser.username.toUpperCase()}: {winnerUser.number}</p> :
          <p>Quien se hará con la corona</p>
        }
        <p className="font-bold text-6xl">{currentUser?.number ?? 0}</p>
        { currentUser &&
          <p className="font-semibold text-3xl">{currentUser.username}</p>
        }
      </div>
    </div>
  )
}

export default App