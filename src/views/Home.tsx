import useTwitch from "@/hooks/useTwitch"
import { useParams } from "react-router-dom";

export const Home = () => {
    let { channel, maxNumber, lifes } = useParams();
    const { userList, winnerUserList, lastValue, resultType } = useTwitch({maxNumber: Number(maxNumber), channel: `#${channel}`, lifes: Number(lifes)})

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center text-white">
            <div className="w-80 h-80 border-2 border-red-400 rounded flex flex-col justify-center items-center">
                {
                    winnerUserList ?
                        <p>{winnerUserList?.users[0].username.toUpperCase()} with {winnerUserList?.users[0].points} points</p> :
                        <p>Quien se hará con la corona</p>
                }
                <p className="font-bold text-6xl">{lastValue}</p>
                {userList &&
                    <>
                        <p className="font-semibold text-3xl">{userList?.users[userList?.users.length - 1].username}</p>
                        <p>{resultType}</p>
                    </>
                }
            </div>
        </div>
    )
}