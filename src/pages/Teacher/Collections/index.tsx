import { Space, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import NewCollectionButton from "../../../components/NewCollectionButton"
import TeacherCollections from "../../../components/TeacherCollections"

const CollectionsPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Collections</title>
			</Helmet>
			<Typography.Title>
				<Space>
					<span>Manage Collections</span>
					<NewCollectionButton />
				</Space>
			</Typography.Title>
			<TeacherCollections />
		</>
	)
}

export default CollectionsPage
