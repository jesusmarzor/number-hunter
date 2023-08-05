import { Input } from "@/components/ui/Input"
import useForm from "@/hooks/useForm";
import { PropertiesConsumer } from "@/contexts/propertiesContext";
import { Button } from "@/components/ui/Button";
import { ButtonType, InputType } from "@/utils/enums";

export const Form = () => {
    const {lifes, setLifes, maxNumber, setMaxNumber} = PropertiesConsumer()
    const {channel, setChannel, handleSubmit, changeNumber, errors} = useForm()
    return (
        <form className="flex flex-col gap-2 w-56" onSubmit={ e => handleSubmit(e)}>
            <Input title="Canal de twitch" name="channel" text={channel} setText={setChannel}  error={errors.channel}/>
            <Input type={InputType.number} title="Number of lifes to users" name="lifes" text={lifes} setText={(text) => changeNumber(setLifes, text)} error={errors.lifes}/>
            <Input type={InputType.number} title="Max range number" name="maxNumber" text={maxNumber} setText={(text) => changeNumber(setMaxNumber, text)}  error={errors.maxNumber}/>
            <Button type={ButtonType.submit} classes="bg-blue-light-default mt-1">Comenzar</Button>
        </form>
    )
}