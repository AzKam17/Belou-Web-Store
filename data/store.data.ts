import { useQuery } from '@tanstack/react-query'
import { Guard } from '@/utils'
import { useAxios } from '@/hooks/useAxios'

export function useGetStore(storeSlug: string) {
	const { axiosIns } = useAxios()
	return useQuery({
		enabled: !Guard.isEmpty(storeSlug),
		queryKey: [`store_${storeSlug}`],
		queryFn: async function() {
			const res = await axiosIns.get(`/store`)
			console.log('opop', res.data)
			return res.data
		},
	})
}
