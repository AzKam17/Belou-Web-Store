import { useQuery } from '@tanstack/react-query'
import { Guard, supabase } from '@/utils'

const TABLE_NAME = 'products'

export function useGetProducts(storeId: string) {
	return useQuery({
		enabled: !Guard.isEmpty(storeId),
		queryKey: [`products_${storeId}`],
		queryFn: async function() {
			const { data, error } = await supabase
				.from(TABLE_NAME)
				.select('*')
				.eq('store_id', storeId)

			if (error) {
				throw error
			}

			return data
		},
	})
}
