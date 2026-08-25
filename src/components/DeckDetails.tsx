import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeckWithStats } from "../types"
import DeleteIcon from "./DeleteIcon"
import ProgressBar from "./ProgressBar"
import { deleteDeck } from "../api/API"

type DeckDetailsProps = {
    deck: DeckWithStats
}

export default function DeckDetails({deck}: DeckDetailsProps) {

    const { name, _id, visitorId, totalCards, totalLearneds } = deck
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteDeck,
        onError: (error) => {
            console.log(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({queryKey: ['decks']})
        }
    })

    const handleDelete = () => {
        console.log(_id)
        console.log('Eliminado mazo...')
        mutate(_id) 
    }

    return (
        <>
            <div className="group relative flex-1 px-4 py-8 bg-white shadow border border-gray-300 rounded-[18px] hover:cursor-pointer hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                <div className="flex justify-between">
                    <p className="font-semibold text-xl flex-1">{name}</p>
                    <DeleteIcon 
                        className="size-5 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        onClick={handleDelete}
                    />
                </div>
                <ProgressBar totalCards={totalCards} totalLearneds={totalLearneds}/>
            </div>
        </> 
    )
}
