import { defaultMinNumber } from "@/utils/constants"
import { InputType } from "@/utils/enums"

interface props {
    type?: InputType
    name: string
    title: string
    text: string | number,
    setText: (text: string) => void
    error?: string
}

export const Input: React.FC<props> = ({type = InputType.text, name, title, text, setText, error}) => {
    const isError = error !== undefined 
    return (
        <div className="relative">
            <div className={`relative flex flex-col items-start rounded overflow-hidden`}>
                <input onChange={e => setText(e.currentTarget.value)} name={name} value={text} type={type} placeholder={title} className={`peer indent-1.5 leading-10 text-black-default px-0.5 pt-2 placeholder-shown:py-2 w-full h-10 border-2 outline-none placeholder-transparent tracking-wider ${isError ? "border-red-default placeholder-shown:border-red-default" : "border-pink-default placeholder-shown:border-transparent"}`}/>
                <span className={`absolute left-2 top-1 text-2xs peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base duration-300 pointer-events-none  ${isError ? "text-red-default peer-placeholder-shown:text-red-default" : "text-pink-default peer-placeholder-shown:text-gray-400 "}`}>
                    {title}
                </span>
            </div>
            { isError && <p className="text-red-default text-xs">{error}</p>}
        </div>
    )
}