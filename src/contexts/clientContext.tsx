import useClient from "@/hooks/useClient";
import { Client } from "@/utils/interfaces";
import { createContext, useContext } from "react";

interface props {
    children: JSX.Element
}

const clientContext = createContext<Client | null>(null);

export const ClientProvider: React.FC<props> = ({children}) => {
    const client = useClient()
    return <clientContext.Provider value={client}>{children}</clientContext.Provider>
}

export const ClientConsumer = () => {
    const context: Client = useContext(clientContext)!
    return context
}