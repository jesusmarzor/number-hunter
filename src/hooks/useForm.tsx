import { PropertiesConsumer } from "@/contexts/propertiesContext"
import { FormErrors } from "@/utils/interfaces"
import validationForm from "@/utils/validationForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useForm = () => {
    const navigate = useNavigate()
    const [channel, setChannel] = useState("")
    const {lifes, maxNumber} = PropertiesConsumer()
    const [errors, setErrors] = useState<FormErrors>({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validationForm(channel, lifes, maxNumber, setErrors) && navigate(channel.toLowerCase())
    }

    const changeNumber = (setNumber: React.Dispatch<React.SetStateAction<number>>, text: string) => {
        setNumber(Number(text))
    }

    return {channel, setChannel, handleSubmit, changeNumber, errors}
}
export default useForm