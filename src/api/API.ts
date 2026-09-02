import { isAxiosError } from "axios"
import { v4 as uuidv4 } from 'uuid'
import api from "../lib/axios";
import type { Deck, DeckWithStats } from "../types";

export const createDeck = async (formData: FormData) => {
    try {
        const { data } = await api.post('/decks', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error, {
                cause: error
            })
        }
    }
}

export const getDecks = async () => {
    let visitorId = localStorage.getItem('visitorId')
    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem('visitorId', visitorId)
    }

    try {
        const { data } = await api<DeckWithStats[]>(`/decks/${visitorId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error, {
                cause: error
            })
        }
    }
}

export const getDeckById = async (deckId: Deck['_id']) => {
    try {
        const { data } = await api<DeckWithStats>(`/deck/${deckId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error, {
                cause: error
            })
        }
    }
}

export const deleteDeck = async (id: string) => {
    try {
        const { data } = await api.delete<string>(`/decks/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error, {
                cause: error
            })
        }
    }
}