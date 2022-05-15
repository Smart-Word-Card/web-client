import axiosClient from "./axios/axiosClient"

export async function uploadImage(image: Blob) {
	const formData = new FormData()
	formData.append("file", image)
	const response = await axiosClient.post("/api/upload", formData)
	return response.data.key
}
