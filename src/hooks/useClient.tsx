import { Client } from "@/utils/interfaces"
import { useEffect, useState } from "react"
import tmi from "tmi.js"

interface ClientConfig {
    client: tmi.Client
    completion: (channel: string, tags: tmi.ChatUserstate, message: string, self: boolean)=> void
}

const useClient = (): Client => {
    const [clientConfig, setClientConfig] = useState<ClientConfig | null>(null)

    useEffect( () => {
        if (clientConfig) {
            clientConfig.client.connect()
            clientConfig.client.on('message', (channel, tags, message, self) => {
                clientConfig.completion(channel, tags, message, self)
            });
        }
    }, [clientConfig])

    const connectClient = (channel: string, completion: (channel: string, tags: tmi.ChatUserstate, message: string, self: boolean)=> void) => {
        disconnectClient()
        const client = tmi.client({
            channels: [channel]
        })
        setClientConfig({
            client: client,
            completion: completion
        })
    }

    const disconnectClient = () => {
        clientConfig?.client.disconnect()
        setClientConfig(null)
    }

    return {connectClient, disconnectClient}
}

export default useClient