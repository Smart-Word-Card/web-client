import useSWR from "swr"
import { Collection } from "../interfaces/Collection"

const useCollection = (id: string) => {
	const url = `/api/card-sets/${id}`

	const { data, mutate, error } = useSWR<Collection>(url)

	const loading = !data && !error

	return {
		collection: data ?? null,
		mutate,
		error,
		loading,
	}
}

export default useCollection
