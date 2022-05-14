import React from "react"
import useTeacherCollections from "../../hooks/useTeacherCollections"
import Collections from "../Collections"

const TeacherCollections = () => {
	const { collections, mutate } = useTeacherCollections()

	return (
		<Collections
			collections={collections}
			collectionOptions={{ editable: true, deletable: true, playable: true }}
			mutateCollections={mutate}
		/>
	)
}

export default TeacherCollections
