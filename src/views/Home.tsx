import useTwitch from "@/hooks/useTwitch"
import { useParams } from "react-router-dom";

export const Home = () => {
    let { channel } = useParams();
    const { currentUser, winnerUser } = useTwitch({channel: `#${channel}`})
    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center text-white">
            <div className="w-80 h-80 border-2 border-red-400 rounded flex flex-col justify-center items-center">
                {
                    winnerUser ?
                        <p>{winnerUser.username.toUpperCase()}: {winnerUser.number}</p> :
                        <p>Quien se hará con la corona</p>
                }
                <p className="font-bold text-6xl">{currentUser?.number ?? 0}</p>
                {currentUser &&
                    <p className="font-semibold text-3xl">{currentUser.username}</p>
                }
            </div>
        </div>
    )
}