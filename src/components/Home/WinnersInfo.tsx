import { maxNumWinners } from "@/utils/constants"
import { WinnerUser } from "@/utils/interfaces"
import { Trophy } from "lucide-react"

interface props {
    winnerUsers: WinnerUser[]
}
export const WinnersInfo: React.FC<props> = ({winnerUsers}) => {
    return (
        <ul className="flex justify-center items-center gap-2 p-2 py-4">
            {
                winnerUsers.sort((a,b) => (a.points > b.points) ? -1 : 1).slice(0, maxNumWinners).map( ({username, points}) => (
                        <li key={username} className={`flex justify-center items-center font-medium w-30`}>
                            <span className="flex justify-center items-center gap-1">{points} <Trophy className="fill-yellow-default" size={14}/></span> 
                            <span className="text-ellipsis overflow-hidden leading-loose pl-1">{username}</span>
                        </li>
                    )
                )
            }
        </ul>
    )
}