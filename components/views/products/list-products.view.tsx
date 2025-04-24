import React from 'react'
import { useSubDomain } from '@/hooks/useSubDomain'
import { useGetStore } from '@/data'
import { useGetProducts } from '@/data/products.data'
import { ListProductImageView } from '@/components/views/products/list-product-image.view'

export const ListProductsView = React.memo(function() {

	const subdomain = useSubDomain()
	const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)
	const { isPending: isProductsPending, data: productsData } = useGetProducts(storeData?.id)

	if (isStorePending || isProductsPending) return <></>

	return (<>
		{productsData?.map((e, idx) => <div key={idx}>
			<ListProductImageView imagePath={e.images[0]} />
			<h3>{e.name}</h3>
			<h3>{e.price} FCFA</h3>
			<br />
		</div>)}
	</>)
})
