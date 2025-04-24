'use client'

import React from 'react'
import { useSubDomain } from '@/hooks/useSubDomain'
import { useGetStore } from '@/data'
import { useGetProducts } from '@/data/products.data'
import { ListProductImageView } from '@/components/views/products/list-product-image.view'
import Link from 'next/link'

export const ListProductsView = React.memo(function() {
	const subdomain = useSubDomain()
	const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)
	const { isPending: isProductsPending, data: productsData } = useGetProducts(storeData?.id)

	if (isStorePending || isProductsPending) return <></>

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{productsData?.map((e, idx) => (
				<div key={idx} className="flex flex-col">
					<Link href={`/product/${e.id}`} className="group">
						<ListProductImageView imagePath={e.images[0]} />
						<div className="mt-2">
							<h3 className="text-lg font-bold">{e.name}</h3>
							<p className="text-lg mt-0.5">{e.price} FCFA</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
})
