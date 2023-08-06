import { Language } from "@/utils/enums"
import { useTranslation } from "react-i18next"

const useLanguage = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (language: Language) => {
        localStorage.setItem("lang", language)
        i18n.changeLanguage(language)
    } 

    const isActive = (language: Language): boolean => (localStorage.getItem("lang") ?? Language.ES) === language

    return {changeLanguage, isActive}
}

export default useLanguage