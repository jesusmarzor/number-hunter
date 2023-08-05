import { PropertiesConsumer } from "@/contexts/propertiesContext";
import { appName, creator, jam } from "@/utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png"
import { Heart } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { InputType } from "@/utils/enums";
import validationForm from "@/utils/validationForm";
import { FormErrors } from "@/utils/interfaces";

export const Login = () => {
    const navigate = useNavigate();
    const [channel, setChannel] = useState("")
    const {lifes, setLifes, maxNumber, setMaxNumber} = PropertiesConsumer()
    const [errors, setErrors] = useState<FormErrors>({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validationForm(channel, lifes, maxNumber, setErrors) && navigate(channel.toLowerCase())
    }

    const changeNumber = (setNumber: React.Dispatch<React.SetStateAction<number>>, text: string) => {
        setNumber(Number(text))
    }

    return (
        <section className="flex flex-col justify-between items-center w-full h-full">
            <header className="flex flex-col mx-auto justify-center items-center self-start">
                <img src={logo} className="w-20 object-cover"/>
                <h1 className="text-3xl font-medium">{appName}</h1>
            </header>
            <form className="flex flex-col gap-2 w-56" onSubmit={ e => handleSubmit(e)}>
                <Input title="Canal de twitch" name="channel" text={channel} setText={setChannel}  error={errors.channel}/>
                <Input type={InputType.number} title="Number of lifes to users" name="lifes" text={lifes} setText={(text) => changeNumber(setLifes, text)} error={errors.lifes}/>
                <Input type={InputType.number} title="Max range number" name="maxNumber" text={maxNumber} setText={(text) => changeNumber(setMaxNumber, text)}  error={errors.maxNumber}/>
                <button className="bg-blue-light-default py-1 rounded text-white-default active:scale-98 transition-transform duration-300 mt-1" type="submit">Comenzar</button>
            </form>
            <footer>
                <p>Created by <a className="text-blue-light-default border-blue-light-default hover:border-b" href={creator.url} target="_blank">{creator.nick}</a> with <Heart className="inline w-4 fill-red-default stroke-red-default"/> for <a className="text-blue-light-default border-blue-light-default hover:border-b" href={jam.url} target="_blank">{jam.name}</a></p>
            </footer>
        </section>
    )
}