import useLanguage from "@/hooks/useLanguage"
import { Language as Lang } from "@/utils/enums"

interface props {
    children: Lang
    onClick: () => void
}

export const Language: React.FC<props> = ({onClick, children}) => {
    const {isActive} = useLanguage()
    return (
        <button onClick={onClick} className={`w-6 h-6 ${isActive(children) && "bg-pink-default text-white-medium"} rounded-full flex justify-center items-start text-sm`}>
            {children}
        </button>
    )
}