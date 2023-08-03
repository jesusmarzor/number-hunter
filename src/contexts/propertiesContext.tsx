import useProperties from "@/hooks/useProperties";
import { Properties } from "@/utils/interfaces";
import { createContext, useContext } from "react";

interface props {
    children: JSX.Element
}

const propertiesContext = createContext<Properties | null>(null);

export const PropertiesProvider: React.FC<props> = ({children}) => {
    const properties = useProperties()
    return <propertiesContext.Provider value={properties}>{children}</propertiesContext.Provider>
}

export const PropertiesConsumer = () => {
    const context: Properties = useContext(propertiesContext)!
    return context
}