import { Card } from "antd"
import React from "react"
import { Collection, CollectionOptions } from "../../interfaces/Collection"
import { getImageURLFromKey } from "../../utils/getImageURLFromKey"
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
			cover={
				<div style={{ height: 120 }}>
					<img
						style={{ objectFit: "cover", width: "100%", height: "100%" }}
						alt={collection.name}
						src={getImageURLFromKey(collection.coverImage)}
					/>
				</div>
			}
			actions={actions}
		>
			<Card.Meta
				title={collection.name}
				description={`words: ${collection.cards.length}`}
			/>
		</Card>
	)
}

export default CollectionCard
