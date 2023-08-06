import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";
import { LastNumber } from "@/components/Home/LastNumber";
import { WinnersInfo } from "@/components/Home/WinnersInfo";
import useTwitch from "@/hooks/useTwitch"
import getLastIndex from "@/utils/getLastIndex";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti"

export const Home = () => {
    const { channel } = useParams();
    const {  userList, winnerUserList, lastValue, ResultIcon, resetRound, resetGame, showConfetti } = useTwitch({channel: `#${channel}`})
    return (
        <>
            { showConfetti && <Confetti className="w-full h-full object-cover"/> }
            <header className="h-5percent">
                <Header channel={channel}/>
            </header>
            <div className="h-1/5">
                { winnerUserList && <WinnersInfo winnerUsers={winnerUserList.users}/> }
            </div>
            <div className="h-1/2">
                <LastNumber lastValue={lastValue} ResultIcon={ResultIcon} resetGame={resetGame} resetRound={resetRound}/>
            </div>
            <footer className="h-1/4">
                {userList && <Footer currentUser={userList.users[getLastIndex(userList.users)]}/>}
            </footer>
        </>
    )
}