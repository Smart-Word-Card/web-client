import {
	DatabaseOutlined,
	EditOutlined,
	HomeOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import EditCollectionForm from "../../../../components/EditCollectionForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { appRoutes } from "../../../../constants/appRoutes"

const CollectionsEditPage = () => {
	return (
		<>
			<Helmet>
				<title>Edit Collection</title>
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
					{
						label: "edit",
						icon: <EditOutlined />,
					},
				]}
			/>
			<Typography.Title>Edit Collection</Typography.Title>
			<EditCollectionForm />
		</>
	)
}

export default CollectionsEditPage
