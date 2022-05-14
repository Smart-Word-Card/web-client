import { DeleteOutlined } from "@ant-design/icons"
import { Modal, Typography } from "antd"
import React from "react"
import axiosClient from "../../utils/axios/axiosClient"
import popupError from "../../utils/popupError"

interface DeleteCollectionButtonProps {
	collectionId: string
	onFinished?: VoidFunction
}

const DeleteCollectionButton: React.FC<DeleteCollectionButtonProps> = ({
	collectionId,
	onFinished,
}) => {
	const deleteCollection = (collectionId: string) => () => {
		Modal.confirm({
			title: "Are you sure you want to delete this collection?",
			onOk: async () => {
				try {
					await axiosClient.delete(`/api/manage/collections/${collectionId}`)
					if (onFinished) onFinished()
				} catch (error) {
					popupError(error)
				}
			},
		})
	}
	return <DeleteOutlined onClick={deleteCollection(collectionId)} />
}

export default DeleteCollectionButton
