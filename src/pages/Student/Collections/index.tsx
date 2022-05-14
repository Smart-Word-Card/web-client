import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import StudentCollections from "../../../components/StudentCollections"

const CollectionsPage = () => {
	return <>
	<Helmet>
		<title>Collections</title>
	</Helmet>
	<Typography.Title>
	Collections
	</Typography.Title>
	<StudentCollections />
</>
}

export default CollectionsPage
