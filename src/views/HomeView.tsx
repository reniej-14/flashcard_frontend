import { useQuery } from "@tanstack/react-query"
import { getDecks } from "../api/API"
import Decks from "../components/Decks"


export default function HomeView() {

    const { data, isLoading } = useQuery({
        queryFn: getDecks,
        queryKey: ['decks'],
        retry: 1
    })

    if (isLoading) return 'Cargando'
    if (data?.length === 0) return 'Aún no tienes mazos creados'
    if (data) return <Decks decks={data}/>
}
