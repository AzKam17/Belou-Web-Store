import { useQuery } from '@tanstack/react-query'
import { Guard, useSupabase } from '@/utils'
import { useAxios } from '@/hooks/useAxios'

const TABLE_NAME = 'products'

export function useGetProducts(args: {
	storeId: string, page: number, limit: number, search: string
}) {
	const { axiosIns } = useAxios()
	const { storeId, page, limit, search } = args
	return useQuery({
		enabled: !Guard.isEmpty(storeId),
		queryKey: [`products_${storeId}`, page, limit, search],
		queryFn: async function() {
			const res = await axiosIns.get(`/article/list/${storeId}`, {
				params: { page, limit, search },
			})
			return res.data
		},
	})
}

/**
 * Hook to fetch a single product by its ID
 * @param productId The ID of the product to fetch
 * @returns Query result containing the product data
 */
export function useGetProduct(productId: string) {
	const { axiosIns } = useAxios()
	return useQuery({
		enabled: !Guard.isEmpty(productId),
		queryKey: [`product_${productId}`],
		queryFn: async function() {
			const res = await axiosIns.get(`/article/details/${productId}`)
			return res.data
		},
	})
}
