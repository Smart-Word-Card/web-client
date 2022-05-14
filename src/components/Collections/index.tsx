import { List } from "antd"
import React from "react"
import { Collection, CollectionOptions } from "../../interfaces/Collection"
import CollectionCard from "../CollectionCard"

interface CollectionsProps {
	collections: Collection[]
	collectionOptions?: CollectionOptions
}

const Collections: React.FC<CollectionsProps> = ({
	collections,
	collectionOptions = {},
}) => {
	return (
		<List
			grid={{
				gutter: 16,
				xs: 1,
				sm: 2,
				md: 4,
				lg: 4,
				xl: 6,
				xxl: 3,
			}}
			dataSource={collections}
			renderItem={(item) => (
				<List.Item>
					<CollectionCard
						collection={item}
						collectionOptions={collectionOptions}
					/>
				</List.Item>
			)}
		/>
	)
}

export default Collections
