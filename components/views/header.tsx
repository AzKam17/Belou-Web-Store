'use client'

import React from 'react'
import { useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFilePublicUrl } from '@/data/file.data'
import Link from 'next/link'

export function Header() {
	const subdomain = useSubDomain()
	const { isPending, data } = useGetStore(subdomain)
	const { isPending: isStoreImgPending, data: storeImg } = useFilePublicUrl({
		bucket: 'store-pictures',
		publicBucket: true,
		path: data?.picture,
	})

	if (isPending || isStoreImgPending) return <></>

	return (
		<Link href="/">
			{/* Mobile design: horizontal layout with smaller logo */}
			<div className="flex flex-row items-center lg:flex-col lg:items-center gap-3 py-4 w-full">
				<Avatar className="h-10 w-10 lg:h-32 lg:w-32">
					<AvatarImage src={storeImg} />
					<AvatarFallback>B</AvatarFallback>
				</Avatar>
				<h1 className="text-lg font-semibold lg:text-2xl">{data?.name}</h1>
			</div>
		</Link>
	)
}
