import { EditFilled, TeamOutlined } from "@ant-design/icons"
import { Button, Col, Row, Space, Typography } from "antd"
import React from "react"
import { appRoutes } from "../../constants/appRoutes"

const LandingPage = () => {
	return (
		<>
			<Typography.Title>Smart Word Cards</Typography.Title>
			<Space>
				<Button icon={<EditFilled />} href={appRoutes.TEACHER_COLLECTIONS}>
					Teacher
				</Button>
				<Button
					type="primary"
					icon={<TeamOutlined />}
					href={appRoutes.STUDENT_COLLECTIONS}
				>
					Student
				</Button>
			</Space>
		</>
	)
}

export default LandingPage
