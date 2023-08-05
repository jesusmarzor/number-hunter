import { FormErrors } from "@/utils/interfaces"
import { minNumber, minLifes } from "@/utils/constants"

export default (channel: string, lifes: number, maxNumber: number, setError: (errors: FormErrors) => void): boolean => {
    let errors: FormErrors = {}
    if(channel.length === 0) {
        errors.channel = "form.channel.error"
    }
	if(lifes < minLifes){
		errors.lifes = "form.lifes.error"
    }
    if(maxNumber < minNumber) {
        errors.maxNumber = "form.maxNumber.error"
    }
    setError(errors)
    return Object.keys(errors).length === 0
}