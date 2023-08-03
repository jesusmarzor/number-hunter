import { PropertiesConsumer } from "@/contexts/propertiesContext";
import useTwitch from "@/hooks/useTwitch"
import { defaultMinNumber } from "@/utils/constants";
import { Heart, LineChart, LogOut, RefreshCcw, RotateCcw, Trophy, Twitch } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const { channel } = useParams();
    const {lifes, maxNumber} = PropertiesConsumer()
    const {  userList, winnerUserList, lastValue, ResultIcon, resetRound, resetGame } = useTwitch({channel: `#${channel}`})
    return (
        <div className="flex flex-col justify-start items-center w-full h-full p-2">
            <header className="h-[5%] flex justify-center items-center gap-2 w-full">
                <button onClick={() => navigate("/")} className="-scale-100 mr-auto">
                    <LogOut size={15}/>
                </button>
                <ul className="flex justify-center items-center gap-3">
                    <li className="flex justify-center items-center gap-1"><Heart fill="red" size={15}/> {lifes}</li>
                    <li className="flex justify-center items-center gap-1"><LineChart size={15}/> {defaultMinNumber} - {maxNumber}</li>
                    <li className="flex justify-center items-center gap-1"><Twitch size={15} className="stroke-violet-400" fill="white"/> {channel}</li>
                </ul>
            </header>
                
            <div className="h-[20%] flex justify-center items-center w-full">
            {
                winnerUserList &&
                <ul className="flex justify-center items-center gap-2 flex-wrap p-2 py-4 w-full">
                    {
                        winnerUserList.users.sort((a,b) => (a.points > b.points) ? -1 : 1).map( ({username, points}) => (
                                <li key={username} className="flex justify-center items-center gap-1 font-medium w-[30%]">
                                    <span className="flex justify-center items-center gap-1">{points} <Trophy size={14} fill="yellow"/></span> 
                                    <span className="text-ellipsis overflow-hidden">{username}</span>
                                </li>
                            )
                        )
                    }
                </ul>
            }
            </div>
            <div className="relative w-[50%] h-[50%] rounded-full bg-[#61C0BF] text-[#F3F3F3]">
                <div className="w-full h-full rounded-full overflow-hidden flex justify-center items-center text-center p-2">
                    {
                        lastValue ?
                        <p className="font-bold text-8xl w-full">{lastValue}</p> :
                        <p className="font-bold text-3xl text-center">¿Alguien se anima?</p>
                    }
                </div>
                <button onClick={() => resetGame()} className="absolute bottom-1 left-1 bg-[#FFB6FF] w-12 h-12 flex justify-center items-center rounded-full text-[#F3F3F3]">
                    <RefreshCcw size={23}/>
                </button>
                <button onClick={() => resetRound()} className="absolute bottom-1 right-1 bg-[#FFB6FF] w-12 h-12 flex justify-center items-center rounded-full text-[#F3F3F3]">
                    <RotateCcw size={23}/>
                </button>
                <div className="absolute -bottom-6 left-0 right-0 m-auto bg-[#F3F3F3] w-12 h-12 flex justify-center items-center rounded-full bg- border-4 border-[#FFB6FF]">
                    { ResultIcon && <ResultIcon className="stroke-[#FFB6FF]"/> }
                </div>
            </div>
            <div className="h-[25%] flex justify-center items-center">
                {userList && <p className="font-semibold text-3xl">{userList?.users[userList?.users.length - 1].username}</p>}
            </div>
        </div>
    )
}