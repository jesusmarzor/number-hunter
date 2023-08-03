import useProperties from "@/hooks/useProperties";
import { createContext, useContext } from "react";

interface props {
    children: JSX.Element
}

const propertiesContext = createContext<any>(null);

export const PropertiesProvider: React.FC<props> = ({children}) => {
    const properties = useProperties()
    return <propertiesContext.Provider value={properties}>{children}</propertiesContext.Provider>
}

export const PropertiesConsumer = () => {
    const context = useContext(propertiesContext)
    return context
}