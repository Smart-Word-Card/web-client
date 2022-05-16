import {
	DatabaseOutlined,
	EditOutlined,
	HomeOutlined,
	SettingOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditCollectionForm from "../../../../components/EditCollectionForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { appRoutes } from "../../../../constants/appRoutes"
import useCollection from "../../../../hooks/useCollection"
import { CollectionFormValues } from "../../../../interfaces/Collection"

const CollectionsEditPage = () => {
	const { collectionId } = useParams()
	if (!collectionId) return <div>Loading...</div>

	const { collection, mutate, loading, error } = useCollection(collectionId)

	if (loading) return <div>Loading...</div>

	if (error || !collection) return <div>An error occurred.</div>

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
			<EditCollectionForm initialValues={collection} />
		</>
	)
}

export default CollectionsEditPage
