import { UploadFile } from "antd/lib/upload/interface"
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

export interface CreateCollection {
	name: string
	coverImage: string
	cards: Omit<WordCard, "id">[]
}

export interface CollectionFormValues {
	name: string
	coverImage: UploadFile[]
	cards: { image: UploadFile[]; word: string }[]
}
