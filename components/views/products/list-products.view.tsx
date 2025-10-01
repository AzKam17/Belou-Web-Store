'use client'

import React, { useState } from 'react'
import { useSubDomain, useMinimumLoadingTime } from '@/hooks'
import { useGetStore } from '@/data'
import { useGetProducts } from '@/data/products.data'
import { ListProductImageView } from '@/components/views/products/list-product-image.view'
import Link from 'next/link'
import { ProductsLoadingSkeleton } from '@/components/views/products/products-loading-skeleton'
import { ArticleType } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'


export const ListProductsView = React.memo(function() {
	const subdomain = useSubDomain()
	const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)

	const [page, setPage] = useState(1)
	const [limit] = useState(6)
	const [search, setSearch] = useState('')

	const debouncedSearch = useDebounce(search, 500)

	const { isPending: isProductsPending, data: productsData } = useGetProducts({
		storeId: storeData?.id,
		page,
		limit,
		search: debouncedSearch,
	})

	const isDataLoading = isStorePending || isProductsPending || !productsData
	const showLoading = useMinimumLoadingTime(isDataLoading)

	const noItems = !showLoading && (!productsData || productsData.items.length === 0)

	// ✅ total pages calculation
	const totalPages = productsData ? Math.ceil(productsData.total / limit) : 1

	return (
		<div className="py-6">
			{/* ✅ Search bar */}
			<div className="mb-4 flex justify-center">
				<input
					type="text"
					placeholder="Rechercher un produit..."
					value={search}
					onChange={(e) => {
						setPage(1)
						setSearch(e.target.value)
					}}
					className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			{/* ✅ Product grid, no-items, or loading */}
			{showLoading ? (
				<ProductsLoadingSkeleton />
			) : noItems ? (
				<div className="flex flex-col items-center justify-center py-16 text-center col-span-full">
					{debouncedSearch ? (
						<>
							<h3 className="text-xl font-medium text-gray-700 mb-2">
								Aucun résultat trouvé
							</h3>
							<p className="text-gray-500">
								Nous n’avons trouvé aucun produit correspondant à « {debouncedSearch} ».
							</p>
						</>
					) : (
						<>
							<h3 className="text-xl font-medium text-gray-700 mb-2">
								Aucun produit disponible
							</h3>
							<p className="text-gray-500">
								Les produits seront bientôt ajoutés à cette boutique.
							</p>
						</>
					)}
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{productsData.items.map((e: ArticleType, idx: number) => (
						<div
							key={idx}
							className="flex flex-col items-center sm:items-start w-full group"
						>
							<Link href={`/product/${e.id}`} className="w-full">
								<div className="overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.02]">
									<ListProductImageView imagePath={e.main_image} />
								</div>
								<div className="mt-3 space-y-1">
									<h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
										{e.name}
									</h3>
									<p className="text-lg text-muted-foreground">{e.price} FCFA</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			)}

			{/* ✅ Pagination controls with numbers + arrows */}
			<div className="flex justify-center items-center gap-2 mt-6">
				<button
					disabled={page === 1}
					onClick={() => setPage((p) => p - 1)}
					className="w-9 h-9 flex items-center justify-center border rounded-full disabled:opacity-50 hover:bg-gray-100"
				>
					<ChevronLeftIcon className="w-5 h-5" />
				</button>

				{Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
					<button
						key={num}
						onClick={() => setPage(num)}
						className={`w-9 h-9 flex items-center justify-center border rounded-full 
				${num === page
							? 'bg-primary text-white border-primary'
							: 'hover:bg-gray-100'
						}`}
					>
						{num}
					</button>
				))}

				<button
					disabled={page === totalPages}
					onClick={() => setPage((p) => p + 1)}
					className="w-9 h-9 flex items-center justify-center border rounded-full disabled:opacity-50 hover:bg-gray-100"
				>
					<ChevronRightIcon className="w-5 h-5" />
				</button>
			</div>
		</div>
	)
})

ListProductsView.displayName = 'ListProductsView'
