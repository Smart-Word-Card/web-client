import { Layout } from "antd"
import React from "react"

interface AppLayoutProps {
	children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return (
		<Layout>
			<Layout.Content style={{ minHeight: "100vh", padding: "24px 32px" }}>
				{children}
			</Layout.Content>
		</Layout>
	)
}

export default AppLayout
