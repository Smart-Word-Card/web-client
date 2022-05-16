import { EditOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../constants/appRoutes"

interface EditCollectionButtonProps {
	collectionId: string
}

const EditCollectionButton: React.FC<EditCollectionButtonProps> = ({
	collectionId,
}) => {
	const navigate = useNavigate()
	function navigateToEditPage() {
		navigate(`${appRoutes.TEACHER_COLLECTIONS_EDIT}${collectionId}`)
	}
	return <EditOutlined onClick={navigateToEditPage} />
}

export default EditCollectionButton
