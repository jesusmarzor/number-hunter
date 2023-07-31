import useLocalStorage from "@/hooks/useLocalStorage"
import { useEffect, useState } from "react"
import tmi from "tmi.js"
import { usernameDefault } from "@/utils/constants"
import { User } from "@/utils/interfaces"

const myChannel = "#jesusmarzor"

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [winnerUser, setWinnerUser] = useState<User | null>(null)
  const { getUser, setUser, removeUser } = useLocalStorage()

  useEffect( () => {
    removeUser("currentUser")
    let winnerUser = getUser("winnerUser")
    if (winnerUser && winnerUser.channel === myChannel) {
      setWinnerUser(getUser("winnerUser"))
    }
    const client = tmi.client({
      channels: [myChannel]
    })
    client.connect()
    client.on('message', (channel, tags, message, self) => {
      if(self || tags.username === getUser("currentUser")?.username) return;
      let newNumber = Number(message)
      if (newNumber) {
        if ((newNumber === (Number(getUser("currentUser")?.number ?? 0) + 1))) {
          newNumber > Number(getUser("winnerUser")?.number) && setWinnerUser(null)
          let currentUser = {
            channel: channel,
            username: tags.username ?? usernameDefault,
            number: message
          }
          setCurrentUser(currentUser)
          setUser("currentUser", currentUser)
        } else {
          let winnerNumber = Number(getUser("winnerUser")?.number)
          if (!winnerNumber || Number(getUser("currentUser")?.number) > winnerNumber) {
            let winnerUser =  getUser("currentUser")
            if (winnerUser) {
              setWinnerUser(winnerUser)
              setUser("winnerUser", winnerUser)
            }
          }
          setCurrentUser(null)
          removeUser("currentUser")
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