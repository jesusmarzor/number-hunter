import { Input } from "@/components/ui/Input"
import useForm from "@/hooks/useForm";
import { PropertiesConsumer } from "@/contexts/propertiesContext";
import { Button } from "@/components/ui/Button";
import { ButtonType, InputType } from "@/utils/enums";
import { useTranslation } from "react-i18next";
import { minLifes, minNumber } from "@/utils/constants";

export const Form = () => {
    const { t } = useTranslation()
    const {lifes, setLifes, maxNumber, setMaxNumber} = PropertiesConsumer()
    const {channel, setChannel, handleSubmit, changeNumber, errors} = useForm()
    return (
        <form className="flex flex-col gap-2 w-56" onSubmit={ e => handleSubmit(e)}>
            <Input title={t("form.channel.title")} name="channel" text={channel} setText={setChannel}  error={errors.channel && t(errors.channel)}/>
            <Input type={InputType.number} title={t("form.lifes.title")} name="lifes" text={lifes} setText={(text) => changeNumber(setLifes, text)} error={errors.lifes && t(errors.lifes).replace("@", String(minLifes))}/>
            <Input type={InputType.number} title={t("form.maxNumber.title")} name="maxNumber" text={maxNumber} setText={(text) => changeNumber(setMaxNumber, text)}  error={errors.maxNumber && t(errors.maxNumber).replace("@", String(minNumber))}/>
            <Button type={ButtonType.submit} classes="bg-blue-light-default mt-1">{t("common.start")}</Button>
        </form>
    )
}