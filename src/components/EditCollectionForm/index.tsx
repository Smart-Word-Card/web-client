import {
	CheckCircleOutlined,
	DeleteOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons"
import { Button, Form, Input, Modal, Space, Typography, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../constants/appRoutes"
import { Collection, CreateCollection } from "../../interfaces/Collection"
import axiosClient from "../../utils/axios/axiosClient"
import { getImageURLFromKey } from "../../utils/getImageURLFromKey"
import { getLabelFromImage } from "../../utils/getLabelFromImage"
import { normFile, UploadFileChangeParam } from "../../utils/normFile"
import popupError from "../../utils/popupError"
import { uploadImage } from "../../utils/uploadImage"

interface EditCollectionFormProps {
	initialValues: Collection
}

interface CollectionFormValues {
	name: string
	coverImage: UploadFile[]
	cards: { image: UploadFile[]; word: string }[]
}

const EditCollectionForm: React.FC<EditCollectionFormProps> = ({
	initialValues,
}) => {
	useEffect(() => {
		if (initialValues) {
			const newValues: CollectionFormValues = {
				name: initialValues.name,
				coverImage: [
					{
						uid: initialValues.coverImage,
						name: initialValues.name,
						url: getImageURLFromKey(initialValues.coverImage),
					},
				],
				cards: initialValues.cards.map(({ image, word }) => ({
					image: [
						{
							uid: image,
							name: word,
							url: getImageURLFromKey(image),
						},
					],
					word,
				})),
			}
			form.setFieldsValue(newValues)
		}
	}, [JSON.stringify(initialValues)])

	const [form] = Form.useForm<CollectionFormValues>()
	const navigate = useNavigate()

	async function onEditCollection(values: CollectionFormValues) {
		try {
			const coverImageKey = values.coverImage[0].originFileObj
				? await uploadImage(values.coverImage[0].originFileObj as Blob)
				: initialValues.coverImage
			const cardsWithKeys = await Promise.all(
				values.cards.map(async ({ image, word }) => {
					const imageKey = image[0].originFileObj
						? await uploadImage(image[0].originFileObj as Blob)
						: image[0].uid
					return {
						image: imageKey,
						word,
					}
				})
			)
			const payload: CreateCollection = {
				name: values.name,
				coverImage: coverImageKey,
				cards: cardsWithKeys,
			}
			await axiosClient.put(`/api/card-sets/${initialValues.id}`, payload)
			navigate(appRoutes.TEACHER_COLLECTIONS)
		} catch (error) {
			popupError(error)
		}
	}

	const onChange =
		(index: number) =>
		async ({ fileList }: UploadFileChangeParam) => {
			if (!fileList.length) return
			try {
				const values = form.getFieldsValue()
				const image = values.cards[index].image[0].originFileObj as Blob
				const word = await getLabelFromImage(image)
				values.cards[index].word = word
				form.setFieldsValue(values)
			} catch (error) {
				popupError(error)
			}
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
		<Form form={form} onFinish={onEditCollection} layout="vertical">
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
					<Button
						type="primary"
						htmlType="submit"
						icon={<CheckCircleOutlined />}
					>
						Submit
					</Button>
				</Space>
			</Form.Item>
		</Form>
	)
}

export default EditCollectionForm
