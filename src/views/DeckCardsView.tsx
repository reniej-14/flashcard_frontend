import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getCards } from "../api/API"


export default function DeckCardsView() {
    const { deckId } = useParams()

    const { data, isLoading } = useQuery({
        queryFn: () => getCards(deckId!),
        queryKey: ['cards'],
        retry: 1    
    })

    
    console.log(data)

    return (
        <div>DeckCardsView</div>
    )
}
