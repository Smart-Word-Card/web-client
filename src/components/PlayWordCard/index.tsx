import {
	AudioOutlined,
	CheckCircleFilled,
	CheckCircleTwoTone,
	CloseCircleOutlined,
	LeftCircleOutlined,
	LeftOutlined,
	RightCircleOutlined,
	RightOutlined,
	SoundOutlined,
} from "@ant-design/icons"
import { Button, Col, Image, Row, Space, Spin, Typography } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { WordCard } from "../../interfaces/WordCard"
import axiosClient from "../../utils/axios/axiosClient"
import { getImageURLFromKey } from "../../utils/getImageURLFromKey"

interface PlayWordCardProps {
	wordCard: WordCard
	isCorrect: boolean
	onPrevious: VoidFunction
	onNext: VoidFunction
	onCorrect: VoidFunction
	onWrong: VoidFunction
}

const PlayWordCard: React.FC<PlayWordCardProps> = ({
	wordCard,
	isCorrect,
	onPrevious,
	onNext,
	onCorrect,
	onWrong,
}) => {
	async function readOutLoud(word: string) {
		const resp = await fetch("/api/read", {
			method: "POST",
			headers: {
				Accept: "audio/mp3",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: word,
			}),
		})
		const arrayBuffer = await resp.arrayBuffer()
		const audioContext = new AudioContext()
		audioContext.decodeAudioData(arrayBuffer, (buffer) => {
			console.log(buffer)
			const source = audioContext.createBufferSource()
			source.buffer = buffer
			source.connect(audioContext.destination)
			source.start()
		})
	}

	const [transcription, setTranscription] = useState("")

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)

	const record = () => {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			alert("Your browser does not support recording!")
			return
		}
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
			})
			.then((stream) => {
				if (!mediaRecorderRef.current) {
					mediaRecorderRef.current = new MediaRecorder(stream)
				}
				const mediaRecorder = mediaRecorderRef.current
				mediaRecorder.start()
				mediaRecorder.ondataavailable = async (ev) => {
					const formData = new FormData()
					formData.append("audio", ev.data)
					setIsProcessing(true)
					const response = await axiosClient.post(
						"/api/transcribe-v2",
						formData
					)
					console.log(response.data)
					setIsProcessing(false)
					setTranscription(response.data[0]?.alternatives[0]?.transcript)
				}
				mediaRecorder.onstop = (ev) => {
					console.log("stopped", ev)
				}
				mediaRecorder
			})
	}

	const stopRecord = () => {
		mediaRecorderRef.current?.stop()
	}

	const [isRecording, setIsRecording] = useState(false)
	const [isProcessing, setIsProcessing] = useState(false)

	useEffect(() => {
		if (transcription.toLowerCase() === wordCard.word.toLowerCase()) {
			onCorrect()
		} else {
			onWrong()
		}
	}, [transcription])

	return (
		<>
			<Row justify="center">
				<Image
					height="50vh"
					alt={wordCard.word}
					src={getImageURLFromKey(wordCard.image)}
				/>
			</Row>
			<Row justify="center">
				<Space>
					<Typography.Title level={3}>
						<Space>
							{wordCard.word}
							{isCorrect && <CheckCircleTwoTone twoToneColor="#52c41a" />}
						</Space>
					</Typography.Title>
				</Space>
			</Row>
			<Row justify="center">
				<Typography.Paragraph>
					Result: {isProcessing ? <Spin /> : transcription}
				</Typography.Paragraph>
			</Row>
			<Row justify="center" gutter={8}>
				<Col>
					<Space direction="vertical" align="center">
						<Button
							type="primary"
							size="large"
							icon={<LeftOutlined />}
							shape="circle"
							onClick={() => {
								setTranscription("")
								onPrevious()
							}}
						/>
						<Typography.Text strong>Back</Typography.Text>
					</Space>
				</Col>

				<Col>
					<Space direction="vertical" align="center">
						<Button
							type="primary"
							size="large"
							icon={<SoundOutlined />}
							shape="circle"
							onClick={() => readOutLoud(wordCard.word)}
						/>
						<Typography.Text strong>Listen</Typography.Text>
					</Space>
				</Col>
				<Col>
					{isRecording ? (
						<Space direction="vertical" align="center">
							<Button
								type="primary"
								danger
								size="large"
								icon={<CloseCircleOutlined />}
								shape="circle"
								onClick={() => {
									setIsRecording(false)
									stopRecord()
								}}
							/>
							<Typography.Text strong>Stop</Typography.Text>
						</Space>
					) : (
						<Space direction="vertical" align="center">
							<Button
								type="primary"
								size="large"
								icon={<AudioOutlined />}
								shape="circle"
								onClick={() => {
									setIsRecording(true)
									record()
								}}
							/>
							<Typography.Text strong>Record</Typography.Text>
						</Space>
					)}
				</Col>
				<Col>
					<Space direction="vertical" align="center">
						<Button
							type={isCorrect ? "primary" : "default"}
							size="large"
							icon={<RightOutlined />}
							shape="circle"
							onClick={() => {
								setTranscription("")
								onNext()
							}}
						/>
						<Typography.Text strong>
							{isCorrect ? "Next" : "Skip"}
						</Typography.Text>
					</Space>
				</Col>
			</Row>
		</>
	)
}

export default PlayWordCard
