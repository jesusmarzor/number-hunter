import { PropertiesConsumer } from "@/contexts/propertiesContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [channel, setChannel] = useState("")
    const {lifes, setLifes, maxNumber, setMaxNumber} = PropertiesConsumer()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(channel.toLowerCase())
    }

    return (
        <section>
            <h1>Numerica</h1>
            <form className="flex flex-col" onSubmit={ e => handleSubmit(e)}>
                <input value={channel} onChange={e => setChannel(e.currentTarget.value)}/>
                <input value={lifes} onChange={e => setLifes(Number(e.currentTarget.value))} type="number"/>
                <input value={maxNumber} onChange={e => setMaxNumber(Number(e.currentTarget.value))} type="number"/>
                <button type="submit">Comenzar</button>
            </form>
        </section>
    )
}