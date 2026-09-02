import { Fragment, useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type CreateDeckModalProps = {
    isOpen: boolean
    onClose: () => void
    onGenerate: (deckName: string, file: File) => void
    isPending: boolean
}

export default function CreateDeckModal({ isOpen, onClose, onGenerate, isPending }: CreateDeckModalProps) {
    const [deckName, setDeckName] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const canGenerate = deckName.trim() !== '' && file !== null

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile)
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) setFile(selectedFile)
    }

    const handleGenerate = () => {
        if (!canGenerate || !file) return
        onGenerate(deckName, file)
    }

    const handleClose = () => {
        if (isPending) return
        setDeckName('')
        setFile(null)
        onClose()
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={handleClose} className="relative z-50">

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">

                            <div className="flex justify-between items-start mb-1">
                                <Dialog.Title className="text-lg font-semibold">
                                    Crear un nuevo mazo
                                </Dialog.Title>
                                <button
                                    onClick={handleClose}
                                    disabled={isPending}
                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <Dialog.Description className="text-gray-500 text-sm mb-5">
                                Sube un PDF para crear un mazo con tarjetas didacticas.
                            </Dialog.Description>

                            <label className="block text-sm font-medium mb-1">
                                Nombre del mazo
                            </label>
                            <input
                                type="text"
                                value={deckName}
                                onChange={(e) => setDeckName(e.target.value)}
                                placeholder="Por ejemplo, Química Orgánica - Capítulo 4"
                                disabled={isPending}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-5 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
                            />

                            <label className="block text-sm font-medium mb-1">
                                Sube el PDF
                            </label>
                            <div
                                onClick={() => !isPending && fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); if (!isPending) setIsDragging(true) }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center transition-colors ${
                                    isPending ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                                } ${
                                    isDragging ? 'border-blue-400 bg-blue-50' : 'border-blue-200 bg-gray-50'
                                }`}
                            >
                                <div className="bg-blue-100 rounded-full p-2 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-blue-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                </div>

                                {file ? (
                                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                ) : (
                                    <>
                                        <p className="text-sm font-medium">Arrastra y suelta tu PDF aquí</p>
                                        <p className="text-xs text-gray-400 mt-1">o haz clic para explorar · PDF de hasta 20 MB</p>
                                    </>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    disabled={isPending}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={handleClose}
                                    disabled={isPending}
                                    className="px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={!canGenerate || isPending}
                                    className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                >
                                    {isPending ? (
                                        <>
                                            <svg className="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Generando...
                                        </>
                                    ) : (
                                        'Generar Flashcards'
                                    )}
                                </button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition>
    )
}