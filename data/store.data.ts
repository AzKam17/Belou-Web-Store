import { useQuery } from '@tanstack/react-query'
import { Guard, supabase } from '@/utils'

const TABLE_NAME = 'stores'

export function useGetStoreProducts(storeId: string) {
	return useQuery({
		enabled: !Guard.isEmpty(storeId),
		queryKey: [`store_${storeId}`],
		queryFn: async function() {
			console.log(storeId)
			const { data, error } = await supabase
				.from(TABLE_NAME)
				.select('*')
				.eq('id', storeId)

			if (error) {
				throw error
			}

			return data
		},
	})
}
