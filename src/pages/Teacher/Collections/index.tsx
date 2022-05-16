import {
	DatabaseOutlined,
	HomeOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import { Space, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import NewCollectionButton from "../../../components/NewCollectionButton"
import PageBreadcrumb from "../../../components/PageBreadcrumb"
import TeacherCollections from "../../../components/TeacherCollections"
import { appRoutes } from "../../../constants/appRoutes"

const CollectionsPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Collections</title>
			</Helmet>
			<PageBreadcrumb
				items={[
					{ icon: <HomeOutlined />, href: appRoutes.LANDING },
					{ label: "collections", icon: <DatabaseOutlined /> },
					{
						label: "manage",
						icon: <SettingOutlined />,
						href: appRoutes.TEACHER_COLLECTIONS,
					},
				]}
			/>
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
