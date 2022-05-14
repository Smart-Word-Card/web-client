import { Card } from "antd"
import React from "react"
import { Collection, CollectionOptions } from "../../interfaces/Collection"
import DeleteCollectionButton from "../DeleteCollectionButton"
import EditCollectionButton from "../EditCollectionButton"
import PlayCollectionButton from "../PlayCollectionButton"

interface CollectionCardProps {
	collection: Collection
	collectionOptions: CollectionOptions
	mutateCollections?: VoidFunction
}

const CollectionCard: React.FC<CollectionCardProps> = ({
	collection,
	collectionOptions = {},
	mutateCollections,
}) => {
	const actions = []
	if (collectionOptions.playable)
		actions.push(
			<PlayCollectionButton
				key={`play-${collection.id}`}
				collectionId={collection.id}
			/>
		)
	if (collectionOptions.editable)
		actions.push(
			<EditCollectionButton
				key={`edit-${collection.id}`}
				collectionId={collection.id}
			/>
		)
	if (collectionOptions.deletable)
		actions.push(
			<DeleteCollectionButton
				key={`delete-${collection.id}`}
				collectionId={collection.id}
				onFinished={mutateCollections}
			/>
		)

	return (
		<Card
			hoverable
			cover={<img alt={collection.name} src={collection.coverImageSrc} />}
			actions={actions}
		>
			<Card.Meta
				title={collection.name}
				description={`words: ${collection.wordCount}`}
			/>
		</Card>
	)
}

export default CollectionCard
