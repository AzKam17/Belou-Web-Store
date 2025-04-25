'use client'

import React from 'react'
import { useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFilePublicUrl } from '@/data/file.data'

export function Header() {
	const subdomain = useSubDomain()
	const { isPending, data } = useGetStore(subdomain)
	const { isPending: isStoreImgPending, data: storeImg } = useFilePublicUrl({
		bucket: 'store-pictures',
		publicBucket: true,
		path: data?.picture,
	})

	if (isPending || isStoreImgPending) return <></>

	return <div className="flex flex-col items-center gap-3 py-4 w-full">
		<Avatar className="h-32 w-32 border border-black">
			<AvatarImage src={storeImg} />
			<AvatarFallback>B</AvatarFallback>
		</Avatar>
		<h1 className="text-2xl font-semibold">{data?.name}</h1>
	</div>
}
