import { WordCard } from "./WordCard"

export interface Collection {
	id: string
	name: string
	coverImage: string
	cards: WordCard[]
}

export interface CollectionOptions {
	editable?: boolean
	deletable?: boolean
	playable?: boolean
}
