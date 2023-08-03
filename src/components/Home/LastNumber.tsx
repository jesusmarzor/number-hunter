import { LucideIcon, RefreshCcw, RotateCcw } from "lucide-react"

interface props {
    lastValue: number | null
    ResultIcon: LucideIcon | null
    resetGame: () => void
    resetRound: () => void
}

export const LastNumber: React.FC<props> = ({lastValue, ResultIcon, resetGame, resetRound}) => {
    return (
        <div className="relative w-[50%] h-full mx-auto rounded-full bg-[#61C0BF] text-[#F3F3F3]">
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
    )
}