import { User } from "@/utils/interfaces"
import { Heart } from "lucide-react"

interface props {
    currentUser: User
}

export const Footer: React.FC<props> = ({currentUser}) => {
    return (
        <div className="flex justify-center items-center h-full gap-2">
            <p className="font-semibold text-3xl overflow-hidden text-ellipsis leading-loose pl-2">{currentUser.username}</p>
            <p className="relative flex justify-center items-center">
                <Heart size={40} className="fill-red-default" strokeWidth={1}/>
                <span className="absolute top-1.5 text-white-default font-bold">
                    {currentUser.lifes}
                </span>
            </p>
        </div>
    )
}