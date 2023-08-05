import logo from "@/assets/logo.png"
import { appName } from "@/utils/constants"

export const Header = () => {
    return (
        <header className="flex flex-col mx-auto justify-center items-center self-start">
            <img src={logo} className="w-20 object-cover"/>
            <h1 className="text-3xl font-medium">{appName}</h1>
        </header>
    )
}