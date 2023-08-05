import { defaultLives, defaultMaxNumber } from "@/utils/constants"
import { Properties } from "@/utils/interfaces"
import { useState } from "react"

const useProperties = (): Properties => {
    const [lives, setLives] = useState<number>(defaultLives)
    const [maxNumber, setMaxNumber] = useState<number>(defaultMaxNumber)

    return {lives, setLives, maxNumber, setMaxNumber}
}

export default useProperties