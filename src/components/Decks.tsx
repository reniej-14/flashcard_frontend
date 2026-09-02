import type { DeckWithStats } from "../types"
import DeckDetails from "./DeckDetails"

type DecksProps = {
    decks: DeckWithStats[]
}

export default function Decks({decks}: DecksProps) {
    console.log(decks)
    return (
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            {decks.map(deck => (
                <DeckDetails deck={deck} key={deck._id}/>
            ))}
        </div>
    )
}
