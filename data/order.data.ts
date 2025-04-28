import { supabase } from '@/utils'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'

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
    product_id: string,
    quantity: number,
    price: number,
}

export function useCreateOrder() {
    return useMutation({
        mutationFn: async (params: Order) => {
            const { data, error } = await supabase
                .rpc('create_order_v1', params)

            if (error) {
                throw error
            }

            return data
        },
    })
}

export function useGetOrder(orderId: string) {
    return useQuery({
        enabled: !!orderId,
        queryKey: [`order_${orderId}`, orderId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single()
            if (error) {
                throw error
            }
            return data
        },
    })

}