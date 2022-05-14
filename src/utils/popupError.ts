import { message } from "antd"
import axios, { AxiosError } from "axios"

const popupError = (err: unknown, errMsg?: string) => {
	let msg = "Some thing went wrong"

	if (errMsg) {
		msg = errMsg
	} else if (axios.isAxiosError(err)) {
		const axiosError = err as AxiosError<{ message: string }>
		if (axiosError.response?.data?.message) {
			msg = axiosError.response?.data?.message
		}
	} else {
		msg = (err as Error)?.message
	}

	message.error(msg)
}

export default popupError
