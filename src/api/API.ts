import { isAxiosError } from "axios"
import { v4 as uuidv4 } from 'uuid'
import api from "../lib/axios";
import type { DeckWithStats } from "../types";

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