'use client'

import React, { useState } from 'react'
import { useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFilePublicUrl } from '@/data/file.data'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useMinimumLoadingTime } from '@/hooks'
import { Search, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart-store'

export function Header() {
	const subdomain = useSubDomain()
	const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)
	/* const { isPending: isStoreImgPending, data: storeImg } = useFilePublicUrl({
		bucket: 'store-pictures',
		publicBucket: true,
		path: storeData?.picture,
	}) */

	React.useEffect(function(){
		console.log('storeData',storeData)
	}, [storeData])
	
	const isLoading = isStorePending /* || isStoreImgPending */
	const showLoading = useMinimumLoadingTime(isLoading)
	
	const cartItems = useCartStore(state => state.items)
	const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
	
	const [showSearch, setShowSearch] = useState(false)
	
	if (showLoading) {
		return (
			<div className="flex flex-col items-center py-4 w-full">
				<Skeleton className="h-10 w-10 lg:h-32 lg:w-32 rounded-full" />
				<Skeleton className="h-6 w-32 lg:h-8 lg:w-48 mt-3" />
				<div className="flex items-center gap-4 mt-4">
					<Skeleton className="h-10 w-10 rounded-full" />
					<Skeleton className="h-10 w-10 rounded-full" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center py-4 w-full">
			<Link href="/">
				<div className="flex flex-col items-center gap-3">
					<Avatar className="h-10 w-10 lg:h-32 lg:w-32">
						{/* <AvatarImage src={storeImg} /> */}
						<AvatarFallback>B</AvatarFallback>
					</Avatar>
					<h1 className="text-lg font-semibold lg:text-2xl">{storeData?.name}</h1>
				</div>
			</Link>
			
			{/* Search and Cart buttons below store name */}
			<div className="flex items-center gap-4 mt-4">
				{/* Search toggle 
				{showSearch ? (
					<div className="flex items-center">
						<Input 
							className="w-[200px] mr-2" 
							placeholder="Rechercher..." 
							autoFocus
							onBlur={() => setShowSearch(false)}
						/>
						<Button 
							variant="ghost" 
							size="icon" 
							onClick={() => setShowSearch(false)}
						>
							<Search className="h-5 w-5" />
						</Button>
					</div>
				) : (
					<Button 
						variant="ghost" 
						size="icon" 
						onClick={() => setShowSearch(true)}
						aria-label="Search"
					>
						<Search className="h-5 w-5" />
					</Button>
				)}*/}
				
				{/* Cart button with link to cart page */}
				<Link href="/cart">
					<Button variant="ghost" className="relative flex items-center gap-2" aria-label="Cart">
						<ShoppingCart className="h-5 w-5" /> 
						<span>Mon Panier</span>
						{cartItemCount > 0 && (
							<span className="absolute -top-1 left-4 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{cartItemCount}
							</span>
						)}
					</Button>
				</Link>
			</div>
		</div>
	)
}
