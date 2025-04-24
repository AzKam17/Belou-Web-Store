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

	return (
		<div className="aspect-square overflow-hidden rounded-lg w-full max-w-[200px]">
			<Image
				src={data!}
				width={200}
				height={200}
				alt="Product image"
				className="h-full w-full object-cover object-center"
			/>
		</div>
	)
})

ListProductImageView.displayName = 'ListProductImageView'
