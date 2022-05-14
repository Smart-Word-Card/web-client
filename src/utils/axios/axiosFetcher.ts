import axiosClient from "./axiosClient"

const axiosFetcher = async (path: string) => {
	const response = await axiosClient.get(path)
	return response.data
}

export default axiosFetcher
