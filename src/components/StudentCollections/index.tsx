import React from "react"
import useStudentCollections from "../../hooks/useStudentCollections"
import Collections from "../Collections"

const StudentCollections = () => {
	const { collections, mutate } = useStudentCollections()

	return (
		<Collections
			collections={collections}
			collectionOptions={{ playable: true }}
		/>
	)
}

export default StudentCollections
