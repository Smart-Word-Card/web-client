import useSWR from "swr"
import { Collection } from "../interfaces/Collection"

const useStudentCollections = () => {
	const url = "/api/card-sets"

	const { data, mutate, error } = useSWR<Collection[]>(url)

	const loading = !data && !error

	return {
		collections: data ?? [],
		mutate,
		error,
		loading,
	}
}

export default useStudentCollections
