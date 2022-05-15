import {
	DeleteOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
	ZoomInOutlined,
} from "@ant-design/icons"
import { Button, Form, Input, Modal, Space, Typography, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../constants/appRoutes"
import axiosClient from "../../utils/axios/axiosClient"
import { normFile, UploadFileChangeParam } from "../../utils/normFile"
import popupError from "../../utils/popupError"

interface NewCollectionFormValues {
	name: string
	coverImage: UploadFile[]
	cards: { image: UploadFile[]; word: string }[]
}

const NewCollectionForm = () => {
	const [form] = Form.useForm<NewCollectionFormValues>()
	const navigate = useNavigate()

	async function onPreviewCollection(values: NewCollectionFormValues) {
		console.log(values)
	}

	async function getLabelFromImage(image: Blob) {
		try {
			const formData = new FormData()
			formData.append("image", image)
			const response = await axiosClient.post("/api/label", formData)
			return response.data[0].description
		} catch (error) {
			popupError(error)
		}
		return ""
	}

	const onChange =
		(index: number) =>
		async ({ fileList }: UploadFileChangeParam) => {
			if (!fileList.length) return false

			const values = form.getFieldsValue()
			console.log("values", values)
			const image = values.cards[index].image[0].originFileObj as Blob
			const word = await getLabelFromImage(image)
			console.log(word)
			values.cards[index].word = word
			form.setFieldsValue(values)

			return false
		}

	function onCancel() {
		if (form.isFieldsTouched()) {
			Modal.confirm({
				title: "Do you want to discard all changes?",
				onOk: () => {
					navigate(appRoutes.TEACHER_COLLECTIONS)
				},
			})
			return
		}

		navigate(appRoutes.TEACHER_COLLECTIONS)
	}

	return (
		<Form form={form} onFinish={onPreviewCollection} layout="vertical">
			<Form.Item
				name="name"
				label="Collection Name"
				rules={[{ required: true }]}
			>
				<Input maxLength={15} showCount />
			</Form.Item>

			<Form.Item
				name="coverImage"
				label="Cover Image"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				rules={[{ required: true }]}
			>
				<Upload
					name="coverImage"
					beforeUpload={() => false}
					listType="picture"
					accept="image/png, image/jpeg"
					maxCount={1}
				>
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item>

			{/* <Form.Item
				name="images"
				label="Word Images"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				rules={[{ required: true }]}
			>
				<Upload.Dragger
					name="images"
					beforeUpload={() => false}
					listType="picture-card"
					accept="image/png, image/jpeg"
					multiple
					maxCount={10}
				>
					<Space direction="vertical">
						<InboxOutlined />
						<Typography.Text>
							Click or drag file to this area to upload (Max: 10 images)
						</Typography.Text>
					</Space>
				</Upload.Dragger>
			</Form.Item> */}

			<Typography.Paragraph>Words</Typography.Paragraph>

			<Form.List name="cards">
				{(fields, { add, remove }) => {
					return (
						<>
							{fields.map(({ key, name, ...restField }) => {
								return (
									<div key={key}>
										<Space align="baseline">
											<Form.Item
												name={[name, "image"]}
												// label="Word Image"
												valuePropName="fileList"
												getValueFromEvent={normFile}
												rules={[{ required: true }]}
												{...restField}
											>
												<Upload
													name="image"
													beforeUpload={() => false}
													onChange={onChange(name)}
													listType="picture"
													accept="image/png, image/jpeg"
													maxCount={1}
												>
													<Button icon={<UploadOutlined />}>
														Click to upload
													</Button>
												</Upload>
											</Form.Item>
											<Form.Item
												name={[name, "word"]}
												// label="word"
												{...restField}
												rules={[{ required: true }]}
											>
												<Input />
											</Form.Item>
											<MinusCircleOutlined onClick={() => remove(name)} />
										</Space>
									</div>
								)
							})}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add Word
								</Button>
							</Form.Item>
						</>
					)
				}}
			</Form.List>

			<Form.Item>
				<Space>
					<Button type="default" onClick={onCancel} icon={<DeleteOutlined />}>
						Cancel
					</Button>
					<Button type="primary" htmlType="submit" icon={<ZoomInOutlined />}>
						Preview
					</Button>
				</Space>
			</Form.Item>
		</Form>
	)
}

export default NewCollectionForm
