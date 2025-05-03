import { useQuery } from '@tanstack/react-query'
import { Guard, useSupabase } from '@/utils'

const TABLE_NAME = 'stores'

export function useGetStore(storeSlug: string) {
    const supabase = useSupabase()
	return useQuery({
		enabled: !Guard.isEmpty(storeSlug),
		queryKey: [`store_${storeSlug}`],
		queryFn: async function() {
			const { data, error } = await supabase
				.from(TABLE_NAME)
				.select('*')
				.eq('slug', storeSlug)
				.single()

			if (error) {
				throw error
			}

			return data
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
