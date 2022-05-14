import {
	DatabaseOutlined,
	HomeOutlined,
	PlusCircleOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import NewCollectionForm from "../../../../components/NewCollectionForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { appRoutes } from "../../../../constants/appRoutes"

const CollectionsNewPage = () => {
	return (
		<>
			<Helmet>
				<title>New Collection</title>
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
						label: "new",
						icon: <PlusCircleOutlined />,
					},
				]}
			/>
			<Typography.Title>Create a new collection</Typography.Title>
			<NewCollectionForm />
		</>
	)
}

export default CollectionsNewPage
