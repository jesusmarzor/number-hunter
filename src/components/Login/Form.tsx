import { InputType } from "@/utils/enums"
import { Input } from "../ui/Input"
import useForm from "@/hooks/useForm";
import { PropertiesConsumer } from "@/contexts/propertiesContext";

export const Form = () => {
    const {lifes, setLifes, maxNumber, setMaxNumber} = PropertiesConsumer()
    const {channel, setChannel, handleSubmit, changeNumber, errors} = useForm()
    return (
        <form className="flex flex-col gap-2 w-56" onSubmit={ e => handleSubmit(e)}>
            <Input title="Canal de twitch" name="channel" text={channel} setText={setChannel}  error={errors.channel}/>
            <Input type={InputType.number} title="Number of lifes to users" name="lifes" text={lifes} setText={(text) => changeNumber(setLifes, text)} error={errors.lifes}/>
            <Input type={InputType.number} title="Max range number" name="maxNumber" text={maxNumber} setText={(text) => changeNumber(setMaxNumber, text)}  error={errors.maxNumber}/>
            <button className="bg-blue-light-default py-1 rounded text-white-default active:scale-98 transition-transform duration-300 mt-1" type="submit">Comenzar</button>
        </form>
    )
}