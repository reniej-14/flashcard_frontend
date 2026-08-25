import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDecks } from "../api/API";

export default function AppLayout() {

    const { data } = useQuery({
        queryFn: getDecks,
        queryKey: ['decks'],
        retry: 1
    })

    const totalMazos = data?.length
    let plural = ''
    if (totalMazos! > 1) {
        plural = 's'
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
                        <button className="bg-blue-500 text-white px-4 py-1.5 rounded-xl w-full font-semibold cursor-pointer">Nuevo Mazo</button>
                    </div>
                </div>
                
                <div className="mt-12">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
