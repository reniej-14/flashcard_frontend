import { Outlet } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner"
import { toast } from "sonner"
import { createDeck, getDecks } from "../api/API";
import CreateDeckModal from "../components/CreateDeckModal";
import { useState } from "react";

export default function AppLayout() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    const { data } = useQuery({
        queryFn: getDecks,
        queryKey: ['decks'],
        retry: 1
    })

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: createDeck,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['decks']})
            setShowCreateModal(false)
        }
    })

    const totalMazos = data?.length
    let plural = ''
    if (totalMazos! > 1) {
        plural = 's'
    }

    const handleCreateDeck = (deckName: string, file: File) => {
        const visitorId = localStorage.getItem('visitorId')
        const formData = new FormData()
        formData.append('name', deckName) 
        formData.append('visitorId', visitorId ?? '')
        formData.append('pdf', file)      

        mutate(formData)
    }

    return (
        <>
            <div className="max-w-[90%] md:max-w-4xl mx-auto mt-12 ">
                <div className="flex flex-col md:flex-row justify-between md:items-center">   
                    <div className="pl-1.5 md:p-0">
                        <h1 className="font-semibold text-2xl">FlashCard</h1>
                        <p className="text-gray-600">{data?.length} mazo{plural}</p>
                    </div>

                    <div className="mt-4 md:mt-0 w-full md:w-auto">
                        <button 
                            className="bg-blue-500 text-white px-4 py-1.5 rounded-xl w-full font-semibold cursor-pointer"
                            onClick={() => setShowCreateModal(true)}
                        >Nuevo Mazo</button>
                    </div>
                </div>
                <CreateDeckModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onGenerate={handleCreateDeck}
                    isPending={isPending}
                />
                
                <div className="my-12 ">
                    <Outlet/>
                </div>
            </div>
            <Toaster position='top-right'/>
        </>
    )
}
