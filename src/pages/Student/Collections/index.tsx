import {
	DatabaseOutlined,
	HomeOutlined,
	PlayCircleOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../components/PageBreadcrumb"
import StudentCollections from "../../../components/StudentCollections"
import { appRoutes } from "../../../constants/appRoutes"

const CollectionsPage = () => {
	return (
		<>
			<Helmet>
				<title>Play Collections</title>
			</Helmet>
			<PageBreadcrumb
				items={[
					{ icon: <HomeOutlined />, href: appRoutes.LANDING },
					{ label: "collections", icon: <DatabaseOutlined /> },
					{
						label: "play",
						icon: <PlayCircleOutlined />,
						href: appRoutes.STUDENT_COLLECTIONS,
					},
				]}
			/>
			<Typography.Title>Collections</Typography.Title>
			<StudentCollections />
		</>
	)
}

export default CollectionsPage
