import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeckWithStats } from "../types"
import DeleteIcon from "./DeleteIcon"
import ProgressBar from "./ProgressBar"
import { deleteDeck } from "../api/API"
import { useState } from "react"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type DeckDetailsProps = {
    deck: DeckWithStats
}

export default function DeckDetails({deck}: DeckDetailsProps) {

    const { name, _id, totalCards, totalLearneds } = deck
    const [ showModal, setShowModal ] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()  

    const { mutate } = useMutation({
        mutationFn: deleteDeck,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['decks']})
        }
    })

    const handleDelete = () => {
        mutate(_id) 
    }

    return (
        <>
            <div 
                className="group relative px-4 py-8 bg-white shadow border border-gray-300 rounded-[18px] hover:cursor-pointer hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between md:max-w-[288px] md:min-w-[288px]"
                onClick={() => navigate(`/deck/${deck._id}`)}
            >
                <div className="flex justify-between">  
                    <p className="font-semibold text-xl flex-1">{name}</p>
                    <DeleteIcon 
                        className="size-5 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowModal(true)          
                        }}
                    />
                </div>
                <div className="mt-8">
                    <ProgressBar totalCards={totalCards} totalLearneds={totalLearneds}/>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={showModal}
                deckName={name}
                totalCards={totalCards}
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />
        </> 
    )
}
