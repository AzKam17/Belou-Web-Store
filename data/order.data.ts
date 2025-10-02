import { useMutation, useQuery } from '@tanstack/react-query'
import { useAxios } from '@/hooks/useAxios'

type Order = {
	full_name: string,
	phone_number: string,
	address: string,
	city: string,
	notes?: string,
	payment_method: string,
	store_id: string,
	forwarded_total: number,
	cart_items: OrderItem[]
}

type OrderItem = {
	article_id: string,
	quantity: number,
	price: number,
}

export function useCreateOrder() {
	const { axiosIns } = useAxios()
	return useMutation({
		mutationFn: async (params: Order) => {
			const res = await axiosIns.post(`/orders`, {
				...params,
				client_name: params.full_name,
				client_phone: params.phone_number,
				additionnal_notes: params.notes,
				items: params.cart_items,
			})


			return res.data
		},
	})
}

export function useGetOrder(orderId: string) {
	const { axiosIns } = useAxios()
	return useQuery({
		enabled: !!orderId,
		queryKey: [`order_${orderId}`, orderId],
		queryFn: async function() {
			const res = await axiosIns.get(`/orders/${orderId}`)
			return res.data
		},
	})

}