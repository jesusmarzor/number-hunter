import { FormErrors } from "@/utils/interfaces"
import { defaultMinNumber, minLifes } from "./constants"

export default (channel: string, lifes: number, maxNumber: number, setError: (errors: FormErrors) => void): boolean => {
    let errors: FormErrors = {}
    if(channel.length === 0) {
        errors.channel = "Escribe un canal de twitch"
    }
	if(lifes < defaultMinNumber){
		errors.lifes = `Las vidas tienen que ser mayor que ${minLifes}`
    }
    if(maxNumber < defaultMinNumber) {
        errors.maxNumber = `El numero maximo tiene que ser mayor que ${defaultMinNumber}`;
    }
    setError(errors)
    return Object.keys(errors).length === 0
}