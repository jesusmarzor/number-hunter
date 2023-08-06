import { LucideIcon, RefreshCcw, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ButtonShape } from "@/utils/enums"
import { useTranslation } from "react-i18next"

interface props {
    lastValue: number | null
    ResultIcon: LucideIcon | null
    resetGame: () => void
    resetRound: () => void
}

export const LastNumber: React.FC<props> = ({lastValue, ResultIcon, resetGame, resetRound}) => {
    const { t } = useTranslation()
    return (
        <div className="relative w-1/2 h-full mx-auto rounded-full bg-blue-light-default text-white-medium">
            <div className="w-full h-full rounded-full overflow-hidden flex justify-center items-center text-center p-2">
                {
                    lastValue ?
                    <p className="font-bold text-8xl w-full">{lastValue}</p> :
                    <p className="font-bold text-3xl text-center">{t("home.tryGame")}</p>
                }
            </div>
            <Button shape={ButtonShape.circle} onClick={() => resetGame()} classes="absolute bottom-1 left-1 bg-pink-default">
                <RefreshCcw size={23}/>
            </Button>
            <Button shape={ButtonShape.circle} onClick={() => resetRound()} classes="absolute bottom-1 right-1 bg-pink-default">
                <RotateCcw size={23}/>
            </Button>
            <div className="absolute -bottom-6 left-0 right-0 m-auto bg-white-medium w-12 h-12 flex justify-center items-center rounded-full bg- border-4 border-pink-default">
                { ResultIcon && <ResultIcon className="stroke-pink-default"/> }
            </div>
        </div>
    )
}