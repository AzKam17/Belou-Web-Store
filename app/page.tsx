'use client'

import { useSubDomain } from '@/hooks/useSubDomain'
import { useGetStore } from '@/data'
import { useGetProducts } from '@/data/products.data'

export default function Home() {
	const subdomain = useSubDomain()
	const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)
	const { isPending: isProductsPending, data: productsData } = useGetProducts(storeData?.id)

	if (isStorePending || isProductsPending) return <></>

	return (<>
		{productsData?.map(e => e.name)}
	</>)
}
