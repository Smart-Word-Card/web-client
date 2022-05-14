import axios from "axios"
import appConfig from "../../configuration"

const axiosClient = axios.create({
	baseURL: appConfig.webServicesURL,
})

export default axiosClient
