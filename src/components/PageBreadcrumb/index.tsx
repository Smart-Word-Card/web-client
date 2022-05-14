import { Breadcrumb, Space } from "antd"
import React from "react"
import { Link } from "react-router-dom"

interface BreadcrumbItem {
	label?: string | React.ReactNode
	icon?: React.ReactNode
	href?: string
}

interface PageBreadcrumbProps {
	items: BreadcrumbItem[]
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
	items,
}: PageBreadcrumbProps) => {
	return (
		<Breadcrumb>
			{items.map(({ label, icon, href }) => {
				const text = (
					<Space>
						{icon}
						<span>{label}</span>
					</Space>
				)

				const item = href ? <Link to={href}>{text}</Link> : text

				return <Breadcrumb.Item key={`pbi-${label}`}>{item}</Breadcrumb.Item>
			})}
		</Breadcrumb>
	)
}

export default PageBreadcrumb
