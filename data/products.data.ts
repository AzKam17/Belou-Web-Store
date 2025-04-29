import { useQuery } from '@tanstack/react-query'
import { Guard, useSupabase } from '@/utils'

const TABLE_NAME = 'products'

export function useGetProducts(storeId: string) {
    const supabase = useSupabase()
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

/**
 * Hook to fetch a single product by its ID
 * @param productId The ID of the product to fetch
 * @returns Query result containing the product data
 */
export function useGetProduct(productId: string) {
    const supabase = useSupabase()
	return useQuery({
		enabled: !Guard.isEmpty(productId),
		queryKey: [`product_${productId}`],
		queryFn: async function() {
			const { data, error } = await supabase
				.from(TABLE_NAME)
				.select('*')
				.eq('id', productId)
				.single()

			if (error) {
				throw error
			}

			return data
		},
	})
}
