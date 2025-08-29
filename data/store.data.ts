import { useQuery } from '@tanstack/react-query'
import { Guard } from '@/utils'
import { useAxios } from '@/hooks/useAxios'

const TABLE_NAME = 'stores'

export function useGetStore(storeSlug: string) {
    const {axiosIns} = useAxios()
	return useQuery({
		enabled: !Guard.isEmpty(storeSlug),
		queryKey: [`store_${storeSlug}`],
		queryFn: async function() {
			const res = await axiosIns.get(`/store`)
			console.log('opop',res.data)
			return res.data
		},
	})
}

export function useCheckStoreExists(storeSlug: string) {
    const supabase = useSupabase()
	return useQuery({
		gcTime: 30 * 60 * 1000,
		staleTime: 5 * 60 * 1000, 
		enabled: !Guard.isEmpty(storeSlug),
		queryKey: [`store_exists_${storeSlug}`],
		queryFn: async function() {
			try {
				const { data, error } = await supabase
					.from(TABLE_NAME)
					.select('id')
					.eq('slug', storeSlug)
					.single()
					
				if (error) {
					return false
				}
				
				return !Guard.isEmpty(data)
			} catch (error) {
				console.error('Error checking store existence:', error)
				return false
			}
		},
	})
}
