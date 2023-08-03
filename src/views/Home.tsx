import { Header } from "@/components/Home/Header";
import { WinnersInfo } from "@/components/Home/WinnersInfo";
import useTwitch from "@/hooks/useTwitch"
import { RefreshCcw, RotateCcw } from "lucide-react";
import { useParams } from "react-router-dom";

export const Home = () => {
    const { channel } = useParams();
    const {  userList, winnerUserList, lastValue, ResultIcon, resetRound, resetGame } = useTwitch({channel: `#${channel}`})
    return (
        <div className="flex flex-col justify-start items-center w-full h-full p-2">
            <header className="h-[5%] w-full">
                <Header channel={channel}/>
            </header>
            <div className="h-[20%] w-full">
                { winnerUserList && <WinnersInfo winnerUsers={winnerUserList.users}/> }
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
            <footer className="h-[25%] flex justify-center items-center">
                {userList && <p className="font-semibold text-3xl">{userList?.users[userList?.users.length - 1].username}</p>}
            </footer>
        </div>
    )
}