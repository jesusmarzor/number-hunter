import { maxNumWinners } from "@/utils/constants"
import { WinnerUser } from "@/utils/interfaces"
import { Trophy } from "lucide-react"

interface props {
    winnerUsers: WinnerUser[]
}
export const WinnersInfo: React.FC<props> = ({winnerUsers}) => {
    return (
        <ul className="flex justify-center items-center gap-2 flex-wrap p-2 py-4">
            {
                winnerUsers.slice(0, maxNumWinners).sort((a,b) => (a.points > b.points) ? -1 : 1).map( ({username, points}) => (
                        <li key={username} className="flex justify-center items-center gap-1 font-medium w-[30%]">
                            <span className="flex justify-center items-center gap-1">{points} <Trophy size={14} fill="yellow"/></span> 
                            <span className="text-ellipsis overflow-hidden">{username}</span>
                        </li>
                    )
                )
            }
        </ul>
    )
}