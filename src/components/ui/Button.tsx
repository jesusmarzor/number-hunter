import { ButtonShape, ButtonType } from "@/utils/enums"
import { ReactNode } from "react"

interface props {
    type?: ButtonType
    shape?: ButtonShape
    onClick?: () => void
    children: ReactNode | string
    classes?: string
}

export const Button: React.FC<props> = ({type = ButtonType.button, shape = ButtonShape.rectangle, onClick, children, classes = null}) => {
    let shapeClasses = "rounded active:scale-98 transition-transform duration-300 py-1"
    switch (shape) {
        case ButtonShape.circle:
            shapeClasses = "w-12 h-12 flex justify-center items-center rounded-full"
    }
    return (
        <button onClick={onClick} className={`${shapeClasses} ${classes} text-white-medium`} type={type}>
            {children}
        </button>
    )
}