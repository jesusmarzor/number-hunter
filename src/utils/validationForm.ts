import { FormErrors } from "@/utils/interfaces"
import { minNumber, minLives } from "@/utils/constants"

export default (channel: string, lives: number, maxNumber: number, setError: (errors: FormErrors) => void): boolean => {
    const errors: FormErrors = {}
    if(channel.length === 0) {
        errors.channel = "form.channel.error"
    }
	if(lives < minLives){
		errors.lives = "form.lives.error"
    }
    if(maxNumber < minNumber) {
        errors.maxNumber = "form.maxNumber.error"
    }
    setError(errors)
    return Object.keys(errors).length === 0
}