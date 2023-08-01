import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [channel, setChannel] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/${channel}`)
    }

    return (
        <section>
            <h1>Numerica</h1>
            <form onSubmit={ e => handleSubmit(e)}>
                <input value={channel} onChange={e => setChannel(e.currentTarget.value)}/>
            </form>
        </section>
    )
}