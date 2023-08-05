import { creator, jam } from "@/utils/constants";
import { Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer>
            <p>Created by <a className="text-blue-light-default border-blue-light-default hover:border-b" href={creator.url} target="_blank">{creator.nick}</a> with <Heart className="inline w-4 fill-red-default stroke-red-default"/> for <a className="text-blue-light-default border-blue-light-default hover:border-b" href={jam.url} target="_blank">{jam.name}</a></p>
        </footer>
    )
}