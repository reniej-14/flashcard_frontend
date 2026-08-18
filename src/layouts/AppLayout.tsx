import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

export default function AppLayout() {

    let visitorId = localStorage.getItem('visitorId')

    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem('visitorId', visitorId)
    }

    

    return (
        <>
            <div className="max-w-[90%] md:max-w-4xl mx-auto mt-12 ">
                <div className="flex flex-col md:flex-row justify-between md:items-center">   
                    <div className="pl-1.5 md:p-0">
                        <h1 className="font-semibold text-2xl">FlashCard</h1>
                        <p className="text-gray-600">{} mazos</p>
                    </div>

                    <div className="mt-4 md:mt-0 w-full md:w-auto">
                        <button className="bg-blue-500 text-white px-4 py-1.5 rounded-xl w-full font-semibold cursor-pointer">Nuevo Mazo</button>
                    </div>
                </div>
                
                <div className="mt-8">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
