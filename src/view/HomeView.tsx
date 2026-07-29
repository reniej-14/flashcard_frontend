

export default function HomeView() {
    return (
        <>
            <div className="max-w-[90%] md:max-w-4xl mx-auto flex flex-col md:flex-row justify-between mt-10 md:items-center">
                <div className="pl-1.5 md:p-0">
                    <h1 className="font-semibold text-2xl">FlashCard</h1>
                    <p className="text-gray-600">3 mazos</p>
                </div>

                <div className="mt-4 md:mt-0 w-full md:w-auto">
                    <button className="bg-blue-500 text-white px-4 py-1.5 rounded-xl w-full font-semibold cursor-pointer">Nuevo Mazo</button>
                </div>
            </div>
        </>
    )
}
