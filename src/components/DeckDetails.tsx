import type { DeckWithStats } from "../types"
import ProgressBar from "./ProgressBar"

type DeckDetailsProps = {
    deck: DeckWithStats
}

export default function DeckDetails({deck}: DeckDetailsProps) {

    const { name, _id, visitorId, totalCards, totalLearneds } = deck

    return (
        <>
            <div className="flex-1 px-4 py-8 bg-white shadow border border-gray-300 rounded-[18px] hover:cursor-pointer hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                <p className="font-semibold text-xl">{name}</p>
                <ProgressBar totalCards={totalCards} totalLearneds={totalLearneds}/>
            </div>
        </>
    )
}
