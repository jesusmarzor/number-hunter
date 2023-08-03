import { defaultLifes, defaultMaxNumber } from "@/utils/constants"
import { Properties } from "@/utils/interfaces"
import { useState } from "react"

const useProperties = (): Properties => {
    const [lifes, setLifes] = useState<number>(defaultLifes)
    const [maxNumber, setMaxNumber] = useState<number>(defaultMaxNumber)

    return {lifes, setLifes, maxNumber, setMaxNumber}
}

export default useProperties