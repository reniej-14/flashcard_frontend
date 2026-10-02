import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getCards, resetDeck, updateCard } from "../api/API"
import { toast } from "sonner"

export default function DeckCardsView() {
    const { deckId } = useParams()
    const queryClient = useQueryClient()

    const [isFlipped, setIsFlipped] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const { data, isLoading } = useQuery({
        queryFn: () => getCards(deckId!),
        queryKey: ['cards', deckId],
        retry: 1
    })

    const { mutate, isPending } = useMutation({
        mutationFn: updateCard,
        onError: (error) => {
            console.log(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards', deckId] })
            queryClient.invalidateQueries({ queryKey: ['deck'] })
        }
    })

    const { mutate: mutateResetDeck } = useMutation({
        mutationFn: resetDeck,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['deck'] })
            queryClient.invalidateQueries({ queryKey: ['cards', deckId] })
        }
    })
    const handleReset = () => {
        mutateResetDeck(deckId!)
    }


    if (isLoading) return 'Cargando...'

    if (data) {
        const pendingCards = data.filter(card => !card.learned)
        
        if (pendingCards.length === 0) {    
            return (
                <>
                    <div className="text-center text-xl font-bold mt-12">¡Mazo completado!</div>
                    <p className="text-center mt-6 text-gray-500">Todas las cartas fueron aprendidas. Puedes reiniciar el mazo para repetirlo.</p>

                    <div className="flex justify-center mt-10">
                        <button
                            className="px-4 py-1 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-50 transition-all duration-300 hover:bg-blue-700 hover:cursor-pointer"
                            onClick={handleReset}
                        >
                            Reiniciar
                        </button>
                    </div>
                </>
            )
        }

        const safeIndex = currentIndex >= pendingCards.length ? 0 : currentIndex
        const currentCard = pendingCards[safeIndex]

        const handleFlip = () => setIsFlipped(prev => !prev)

        const goToNext = () => {
            setIsFlipped(false)
            setCurrentIndex(prev => (prev + 1) % pendingCards.length)
        }

        const handleNotLearned = () => {
            goToNext()
        }

        const handleLearned = () => {
            mutate(currentCard._id, {
                onSuccess: () => {
                    setIsFlipped(false)
                }
            })
        }

        return (
            <div className="max-w-2xl mx-auto">
                <div className="text-center text-sm text-gray-400 mt-10 mb-4 font-semibold">
                    <span>Tarjeta {safeIndex + 1} de {pendingCards.length}</span>
                </div>

                {/* Contenedor con perspectiva 3D */}
                <div
                    onClick={handleFlip}
                    className="cursor-pointer [perspective:1200px] min-h-[300px]"
                >
                    <div
                        className="relative w-full h-[300px] transition-transform duration-500 [transform-style:preserve-3d]"
                        style={{
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                    >
                        {/* Cara frontal: Pregunta */}
                        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow py-9 px-10 flex flex-col items-center justify-between text-center">
                            <span className="text-xs uppercase tracking-wide bg-gray-100 px-2 py-1 rounded-full mb-4">
                                Pregunta
                            </span>
                            <p className="text-xl font-semibold">
                                {currentCard.question}
                            </p>
                            <span className="text-xs text-gray-400 mt-6">Click para voltear</span>
                        </div>

                        {/* Cara trasera: Respuesta */}
                        <div
                            className="absolute inset-0 [backface-visibility:hidden] bg-blue-50 rounded-2xl shadow py-9 px-10 flex flex-col items-center justify-between text-center"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            <span className="text-xs uppercase tracking-wide bg-blue-100 px-2 py-1 rounded-full mb-4">
                                Respuesta
                            </span>
                            <p className="text-xl">
                                {currentCard.response}
                            </p>
                            <span className="text-xs text-gray-400 mt-6">Click para voltear</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-8">
                    <button
                        onClick={handleNotLearned}
                        disabled={isPending}
                        className="px-4 py-1.5 rounded-xl border border-gray-300 disabled:opacity-50 transition-all duration-300 hover:bg-gray-100 hover:cursor-pointer"
                    >
                        No aprendida
                    </button>
                    <button
                        onClick={handleLearned}
                        disabled={isPending}
                        className="px-4 py-1.5 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-50 transition-all duration-300 hover:bg-blue-700 hover:cursor-pointer"
                    >
                        {isPending ? 'Guardando...' : 'Aprendida'}
                    </button>
                </div>
            </div>
        )
    }
}