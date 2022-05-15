import axiosClient from "./axios/axiosClient"

export async function getLabelFromImage(image: Blob) {
	const formData = new FormData()
	formData.append("image", image)
	const response = await axiosClient.post("/api/label", formData)
	return response.data[0].description
}
