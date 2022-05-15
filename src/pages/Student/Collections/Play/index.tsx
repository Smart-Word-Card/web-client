import {
	DatabaseOutlined,
	HomeOutlined,
	PlayCircleOutlined,
} from "@ant-design/icons"
import { Button, Image, Rate, Row, Typography } from "antd"
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import PlayWordCard from "../../../../components/PlayWordCard"
import { appRoutes } from "../../../../constants/appRoutes"
import useCollection from "../../../../hooks/useCollection"
import axiosClient from "../../../../utils/axios/axiosClient"

const CollectionsPlayPage = () => {
	const { collectionId } = useParams()
	const { collection, loading, error } = useCollection(collectionId!)

	const noOfWords = collection?.cards.length ?? 0

	const [isCorrect, setIsCorrect] = useState(new Array(noOfWords).fill(0))

	const [currentWordIndex, setCurrentWordIndex] = useState(0)
	const [showResult, setShowResult] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		if (collection) {
			setIsCorrect(new Array(noOfWords).fill(0))
		}
	}, [loading])

	function onPrevious() {
		if (currentWordIndex > 0) setCurrentWordIndex(currentWordIndex - 1)
	}

	function onNext() {
		if (currentWordIndex < noOfWords - 1)
			setCurrentWordIndex(currentWordIndex + 1)
		if (currentWordIndex === noOfWords - 1) {
			setShowResult(true)
		}
	}

	const onCorrect = () => {
		setIsCorrect((arr) => {
			const newArr = Array.from(arr)
			newArr[currentWordIndex] = 1
			return newArr
		})
	}

	const onWrong = () => {
		setIsCorrect((arr) => {
			const newArr = Array.from(arr)
			newArr[currentWordIndex] = 0
			return newArr
		})
	}

	const Result = () => {
		const score = isCorrect.reduce((partialSum, a) => partialSum + a, 0)
		const stars = Math.ceil((score / noOfWords) * 10) / 2
		return (
			<>
				<Row justify="center">
					<Typography.Title level={2}>{collection?.name}</Typography.Title>
				</Row>
				<Row justify="center">
					<Typography.Title level={4}>
						{score} / {noOfWords}
					</Typography.Title>
				</Row>
				<Row justify="center">
					<Rate allowHalf defaultValue={stars} disabled />
				</Row>
				<Row justify="center">
					<Button
						onClick={() => navigate(appRoutes.STUDENT_COLLECTIONS)}
						style={{ marginTop: 20 }}
					>
						Back to home
					</Button>
				</Row>
			</>
		)
	}

	return (
		<>
			<Helmet>
				<title>Play Collections</title>
			</Helmet>
			<PageBreadcrumb
				items={[
					{ icon: <HomeOutlined />, href: appRoutes.LANDING },
					{ label: "collections", icon: <DatabaseOutlined /> },
					{
						label: "play",
						icon: <PlayCircleOutlined />,
						href: appRoutes.STUDENT_COLLECTIONS,
					},
					{
						label: collection?.name,
					},
				]}
			/>
			<Typography.Title>
				{showResult
					? "Result"
					: `${collection?.name} (${currentWordIndex + 1}/${
							collection?.cards.length
					  })`}
			</Typography.Title>

			{collection && !showResult && (
				<PlayWordCard
					wordCard={collection?.cards[currentWordIndex]}
					onPrevious={onPrevious}
					onNext={onNext}
					isCorrect={!!isCorrect[currentWordIndex]}
					onCorrect={onCorrect}
					onWrong={onWrong}
				/>
			)}

			{showResult && <Result />}

			{JSON.stringify(isCorrect)}
		</>
	)
}

export default CollectionsPlayPage
