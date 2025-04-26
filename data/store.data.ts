import { useQuery } from '@tanstack/react-query'
import { Guard, supabase } from '@/utils'

const TABLE_NAME = 'stores'

export function useGetStore(storeId: string) {
	return useQuery({
		enabled: !Guard.isEmpty(storeId),
		queryKey: [`store_${storeId}`],
		queryFn: async function() {
			const { data, error } = await supabase
				.from(TABLE_NAME)
				.select('*')
				.eq('id', storeId)
				.single()

			if (error) {
				throw error
			}

			return data
		},
	})
}

export function useCheckStoreExists(storeId: string) {
	return useQuery({
		gcTime: 30 * 60 * 1000,
		staleTime: 5 * 60 * 1000, 
		enabled: !Guard.isEmpty(storeId),
		queryKey: [`store_exists_${storeId}`],
		queryFn: async function() {
			try {
				const { data, error } = await supabase
					.from(TABLE_NAME)
					.select('id')
					.eq('id', storeId)
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
