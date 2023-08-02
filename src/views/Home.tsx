import useTwitch from "@/hooks/useTwitch"
import { RotateCcw, Trophy } from "lucide-react";
import { useParams } from "react-router-dom";

export const Home = () => {
    let { channel, maxNumber, lifes } = useParams();
    const { userList, winnerUserList, lastValue, resultType, resetGame } = useTwitch({maxNumber: Number(maxNumber), channel: `#${channel}`, lifes: Number(lifes)})
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-96 h-96 rounded flex flex-col justify-start items-center bg-[#F3F3F3]">
                <div className="h-[25%] flex justify-center items-center">
                {
                    winnerUserList &&
                    <ul className="flex justify-center items-centster gap-10">
                        {
                            winnerUserList.users.sort((a,b) => (a.points > b.points) ? -1 : 1).map( ({username, points}) => <li key={username}><p className="flex gap-1"><span className="flex justify-center items-center gap-1">{points} <Trophy size={16} fill="yellow"/></span> {username}</p></li>)
                        }
                    </ul>
                }
                </div>
                <div className="relative w-[50%] h-[50%] rounded-full bg-[#61C0BF] text-[#F3F3F3]">
                    <div className="w-full h-full rounded-full overflow-hidden flex justify-center items-center text-center">
                        {
                            lastValue ?
                            <p className="font-bold text-8xl w-full">{lastValue}</p> :
                            <p className="font-bold text-3xl text-center">¿Alguien se anima?</p>
                        }
                    </div>
                    <button onClick={() => resetGame()} className="absolute bottom-0 right-0 z-1 bg-[#FFB6FF] w-14 h-14 flex justify-center items-center rounded-full text-[#F3F3F3]">
                        <RotateCcw className="" size={25}/>
                    </button>
                </div>
                <div className="h-[25%] flex justify-center items-center">
                    {userList &&
                        <>
                            <p className="font-semibold text-3xl">{userList?.users[userList?.users.length - 1].username}</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}