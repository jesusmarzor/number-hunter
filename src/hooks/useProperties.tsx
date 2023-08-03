import { defaultLifes, defaultMaxNumber } from "@/utils/constants"
import { useState } from "react"

const useProperties = () => {
    const [lifes, setLifes] = useState<number>(defaultLifes)
    const [maxNumber, setMaxNumber] = useState<number>(defaultMaxNumber)

    return {lifes, setLifes, maxNumber, setMaxNumber}
}

export default useProperties