import React from 'react'
import Image from 'next/image'

import { useFilePublicUrl } from '@/data/file.data'
import { Guard } from '@/utils'

export type ListProductImageView = {
	imagePath: string
}

export const ListProductImageView = React.memo((props: ListProductImageView) => {

	const { isPending, data } = useFilePublicUrl({
		bucket: 'product-pictures',
		publicBucket: true,
		path: props.imagePath,
	})

	if (Guard.isEmpty(props.imagePath)) return <></>

	if (isPending) return <></>

	return <>
		<Image
			src={data!}
			width={100}
			height={300}
			alt="Picture of the author"
		/>
	</>
})


ListProductImageView.displayName = 'ListProductImageView'
