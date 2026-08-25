export type Deck = {
    _id: string
    visitorId: string
    name: string
}
export type DeckWithStats = Deck & {
    totalCards: number
    totalLearneds: number
}

export type Card = {
    _id: string
    deck: string
    question: string
    response: string
    learned: boolean
}