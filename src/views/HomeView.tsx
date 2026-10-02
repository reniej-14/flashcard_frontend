import { useQuery } from "@tanstack/react-query"
import { getDecks } from "../api/API"
import Decks from "../components/Decks"


export default function HomeView() {

    const { data, isLoading } = useQuery({
        queryFn: getDecks,
        queryKey: ['decks'],
        retry: 1
    })

    if (isLoading) return <div className="text-center mt-40">Cargando...</div>
    if (data?.length === 0) return <div className="flex items-center justify-center text-center mt-20 text-xl text-gray-900 h-[300px] rounded-3xl ">Aún no tienes mazos creados. Crea uno para empezar a aprender.</div>
    if (data) return <Decks decks={data}/>
}
