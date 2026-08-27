import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import type { Deck, DeckWithStats } from '../types'

type ConfirmDeleteModalProps = {
    isOpen: boolean
    deckName: Deck['name']
    totalCards: DeckWithStats['totalCards']
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmDeleteModal({ isOpen, deckName, totalCards, onConfirm, onCancel }: ConfirmDeleteModalProps) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onCancel} className="relative z-50">

                {/* Overlay oscuro de fondo */}
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

                {/* Contenedor centrado */}
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

                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-red-100 rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <Dialog.Title className="text-lg font-semibold mb-2">
                                ¿Eliminar este mazo?
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-500 text-sm mb-6 mt-4">
                                "{deckName}" y sus {totalCards} tarjetas serán eliminadas permanententemente.
                            </Dialog.Description>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={onCancel}
                                    className="px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 hover:cursor-pointer transition-all duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 hover:cursor-pointer transition-all duration-200"
                                >
                                    Eliminar
                                </button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition>
    )
}