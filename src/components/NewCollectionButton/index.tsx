import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../constants/appRoutes"

const NewCollectionButton = () => {
	const navigate = useNavigate()
	function navigateToNewPage() {
		navigate(appRoutes.TEACHER_COLLECTIONS_NEW)
	}
	return (
		<Button
			type="primary"
			size="small"
			icon={<PlusOutlined />}
			onClick={navigateToNewPage}
		>
			New
		</Button>
	)
}

export default NewCollectionButton
