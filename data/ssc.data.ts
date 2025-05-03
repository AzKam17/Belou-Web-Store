import { supabase } from '@/utils'
import { cache } from 'react'


async function getStoreInfo(storeSlug: string) {
	return supabase
		.from('stores')
		.select('*')
		.eq('slug', storeSlug)
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
