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

	return <>
		<Avatar>
			<AvatarImage src={storeImg} />
			<AvatarFallback>B</AvatarFallback>
		</Avatar>
		<p>{data?.name}</p>
	</>
}
