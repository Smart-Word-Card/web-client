import { UploadFile } from "antd/lib/upload/interface"

export interface UploadFileChangeParam {
	file: UploadFile
	fileList: UploadFile[]
}

export const normFile = (e: UploadFileChangeParam) => {
	return e && e.fileList
}
