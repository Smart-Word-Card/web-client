export interface Collection {
	id: string
	name: string
	wordCount: number
	coverImageSrc: string
}

export interface CollectionOptions {
	editable?: boolean
	deletable?: boolean
}
