import { creator, jam } from "@/utils/constants";
import { Heart } from "lucide-react";
import { Trans } from "react-i18next";

export const Footer = () => {
    const values = {
        nick: creator.nick,
        jam: jam.name
    }
    const components = {
        nick: <a className="text-blue-light-default border-blue-light-default hover:border-b" href={creator.url} target="_blank"/>,
        icon: <Heart className="inline w-4 fill-red-default stroke-red-default"/>,
        jam: <a className="text-blue-light-default border-blue-light-default hover:border-b" href={jam.url} target="_blank"/>
    }
    return (
        <footer>
            <p>
                <Trans i18nKey="footer" values={values} components={components}/>
            </p>
        </footer>
    )
}