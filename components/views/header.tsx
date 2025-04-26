'use client'

import React from 'react'
import { useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFilePublicUrl } from '@/data/file.data'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useMinimumLoadingTime } from '@/hooks'

export function Header() {
	const subdomain = useSubDomain()
	const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)
	const { isPending: isStoreImgPending, data: storeImg } = useFilePublicUrl({
		bucket: 'store-pictures',
		publicBucket: true,
		path: storeData?.picture,
	})
	
	// Use minimum loading time hook to prevent flickering
	const isLoading = isStorePending || isStoreImgPending
	const showLoading = useMinimumLoadingTime(isLoading)

	if (showLoading) {
		return (
			<div className="flex flex-row items-center lg:flex-col lg:items-center gap-3 py-4 w-full">
				<Skeleton className="h-10 w-10 lg:h-32 lg:w-32 rounded-full" />
				<Skeleton className="h-6 w-32 lg:h-8 lg:w-48" />
			</div>
		)
	}

	return (
		<Link href="/">
			{/* Mobile design: horizontal layout with smaller logo */}
			<div className="flex flex-row items-center lg:flex-col lg:items-center gap-3 py-4 w-full">
				<Avatar className="h-10 w-10 lg:h-32 lg:w-32">
					<AvatarImage src={storeImg} />
					<AvatarFallback>B</AvatarFallback>
				</Avatar>
				<h1 className="text-lg font-semibold lg:text-2xl">{storeData?.name}</h1>
			</div>
		</Link>
	)
}
