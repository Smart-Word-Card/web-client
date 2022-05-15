import {
	DeleteOutlined,
	InboxOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
	ZoomInOutlined,
} from "@ant-design/icons"
import {
	Button,
	Col,
	Form,
	Input,
	Modal,
	Row,
	Space,
	Typography,
	Upload,
} from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../constants/appRoutes"
import { PreviewCollection } from "../../interfaces/Collection"
import { PreviewWordCard } from "../../interfaces/WordCard"
import axiosClient from "../../utils/axios/axiosClient"
import { normFile } from "../../utils/normFile"
import popupError from "../../utils/popupError"

interface NewCollectionFormValues {
	name: string
	coverImage: UploadFile[]
	images: UploadFile[]
}

const NewCollectionForm = () => {
	const [form] = Form.useForm<NewCollectionFormValues>()
	const navigate = useNavigate()

	async function onPreviewCollection(values: NewCollectionFormValues) {
		console.log(values)
		return
		try {
			const cards: PreviewWordCard[] = await Promise.all(
				values.images.map(async (image) => {
					const formData = new FormData()
					formData.append("image", image.originFileObj as Blob)
					const response = await axiosClient.post("/api/label", formData)
					return {
						word: response.data[0].description,
						image,
					}
				})
			)
			console.log("cards", cards)

			const previewCollection: PreviewCollection = {
				name: values.name,
				coverImage: values.coverImage[0],
				cards,
			}
			navigate(appRoutes.TEACHER_COLLECTIONS_PREVIEW, {
				state: previewCollection,
			})
		} catch (error) {
			popupError(new Error("Could not preview now"))
		}
	}

	async function getLabelFromImage() {
		return ""
	}

	const beforeUpload = (key: number) => async () => {
		console.log(key)
		const values = form.getFieldsValue()
		console.log(values)
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
									<div>
										<Space key={key} align="baseline">
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
													beforeUpload={beforeUpload(key)}
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
