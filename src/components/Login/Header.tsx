import logo from "@/assets/logo.png"
import { appName } from "@/utils/constants"
import { LANGUAGES } from "@/utils/constants"
import { Language } from "./Language"
import useLanguage from "@/hooks/useLanguage"

export const Header = () => {
    const {changeLanguage} = useLanguage()
    return (
        <header className="relative flex flex-col mx-auto justify-center items-center self-start w-full">
            <ul className="absolute top-1 right-1 flex justify-center items-center gap-2">
                {
                    LANGUAGES.map( lang => (
                        <li key={lang}>
                            <Language onClick={() => changeLanguage(lang)}>{lang}</Language>
                        </li>
                    ))
                }
            </ul>
            <img src={logo} className="w-20 object-cover"/>
            <h1 className="text-3xl font-medium">{appName}</h1>
        </header>
    )
}