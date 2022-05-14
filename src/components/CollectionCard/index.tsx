import { Card } from "antd"
import React from "react"
import { Collection, CollectionOptions } from "../../interfaces/Collection"
import DeleteCollectionButton from "../DeleteCollectionButton"
import EditCollectionButton from "../EditCollectionButton"

interface CollectionCardProps {
	collection: Collection
	collectionOptions: CollectionOptions
}

const CollectionCard: React.FC<CollectionCardProps> = ({
	collection,
	collectionOptions = {},
}) => {
	const actions = []
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