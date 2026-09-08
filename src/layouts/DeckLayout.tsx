import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getDeckById } from "../api/API";
import ArrowIcon from "../components/ArrowIcon";
import ProgressBar from "../components/ProgressBar";


export default function DeckLayout() {
    const { deckId } = useParams()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryFn: () => getDeckById(deckId!),
        queryKey: ['deck'],
        retry: 1
    })

    

    if (isLoading) return 'Cargando...'  

    if (data) { 
        const { totalCards, totalLearneds } = data

        return (
        <>
            <div className="mx-auto md:w-[624px] w-[95%] ">
                <div className="flex gap-3 items-center pt-6 pb-5 border-b border-gray-200">
                    <button 
                        className="text-sm flex items-center gap-1.5 px-3 py-1 hover:cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-300"
                        onClick={() => navigate('/')}
                    >
                        <ArrowIcon className="size-4"/>
                        <div className="">Regresar</div>
                    </button>

                    <div className="border-l border-gray-200 pl-6">
                        <p className="text-xs tracking-[0.16em] text-blue-600">MAZO DE ESTUDIO</p>
                        <h1 className="font-semibold text-xl mt-0.5">{data.name}</h1>
                    </div>
                </div>

                <div className="mt-24 pb-5 border-b border-gray-200">
                    <p className="text-xs tracking-[0.16em] font-semibold mb-3">PROGRESO</p>
                    <ProgressBar totalCards={totalCards} totalLearneds={totalLearneds}/>
                </div>

                <div className="mt-8">
                    <Outlet/>
                </div>
            </div>
            
        </>
        )
    }
}
