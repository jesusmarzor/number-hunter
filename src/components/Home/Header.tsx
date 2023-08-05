import { PropertiesConsumer } from "@/contexts/propertiesContext";
import { defaultMinNumber } from "@/utils/constants";
import { Heart, LogOut, Twitch } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface props {
    channel?: string
}

export const Header: React.FC<props> = ({channel}) => {
    const navigate = useNavigate();
    const {lifes, maxNumber} = PropertiesConsumer()
    return (
        <div className="flex justify-center items-center gap-2 h-full">
            <button onClick={() => navigate("/")} className="-scale-100 mr-auto">
                <LogOut size={15}/>
            </button>
            <ul className="flex justify-center items-center gap-3">
                <li>{defaultMinNumber} - {maxNumber}</li>
                <li className="flex justify-center items-center gap-1"><Heart className="fill-red-default" size={15}/> {lifes}</li>
                <li className="flex justify-center items-center gap-1"><Twitch size={15} className="stroke-twitch fill-white-default"/> {channel}</li>
            </ul>
        </div>
    )
}