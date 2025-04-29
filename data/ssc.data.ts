import { supabase } from '@/utils'
import { cache } from 'react'


async function getStoreInfo(storeId: string) {
	return supabase
		.from('stores')
		.select('*')
		.eq('id', storeId)
		.single()
}


export const getStoreInfoCache = cache(getStoreInfo)

async function getProductInfo(productId: string) {
	return supabase
		.from('products')
		.select(`
			*,
			stores:store_id (
			  id,
			  name
			)
		  `)
		.eq('id', productId)
		.single()
}

export const getProductInfoCache = cache(getProductInfo)
