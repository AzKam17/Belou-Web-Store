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
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
			{productsData?.map((e, idx) => (
				<div key={idx} className="flex flex-col items-center sm:items-start w-full group">
					<Link href={`/product/${e.id}`} className="w-full">
						<div className="overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.02]">
							<ListProductImageView imagePath={e.images[0]} />
						</div>
						<div className="mt-3 space-y-1">
							<h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">{e.name}</h3>
							<p className="text-lg text-muted-foreground">{e.price} FCFA</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
})


ListProductsView.displayName = 'ListProductsView'