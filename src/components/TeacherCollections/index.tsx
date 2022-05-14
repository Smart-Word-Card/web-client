import React from "react"
import useTeacherCollections from "../../hooks/useTeacherCollections"
import Collections from "../Collections"

const TeacherCollections = () => {
	const { collections } = useTeacherCollections()

	return (
		<Collections
			collections={collections}
			collectionOptions={{ editable: true, deletable: true }}
		/>
	)
}

export default TeacherCollections
