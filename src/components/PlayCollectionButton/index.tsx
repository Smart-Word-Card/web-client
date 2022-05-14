import { PlayCircleOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../constants/appRoutes"

interface PlayCollectionButtonProps {
	collectionId: string
}

const PlayCollectionButton: React.FC<PlayCollectionButtonProps> = ({
	collectionId,
}) => {
	const navigate = useNavigate()
	function navigateToEditPage() {
		navigate(`${appRoutes.STUDENT_COLLECTIONS_PLAY}${collectionId}`)
	}
	return <PlayCircleOutlined onClick={navigateToEditPage} />
}

export default PlayCollectionButton
