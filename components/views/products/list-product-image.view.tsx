'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useFilePublicUrl } from '@/data/file.data'
import { Guard } from '@/utils'
import { Skeleton } from '@/components/ui/skeleton'

export type ListProductImageView = {
	imagePath: string
}

export const ListProductImageView = React.memo((props: ListProductImageView) => {
	const { isPending, data } = useFilePublicUrl({
		bucket: 'product-pictures',
		publicBucket: true,
		path: props.imagePath,
	})
	
	// Add state to track minimum loading time
	const [showLoading, setShowLoading] = useState(true)
	
	// Effect to handle minimum loading time (500ms)
	useEffect(() => {
		if (!isPending && data) {
			// Data is loaded, but we'll keep showing loading state for at least 500ms
			const timer = setTimeout(() => {
				setShowLoading(false)
			}, 500)
			
			return () => clearTimeout(timer)
		} else {
			setShowLoading(true)
		}
	}, [isPending, data])

	if (Guard.isEmpty(props.imagePath)) return <></>
	
	// Use showLoading instead of isPending for UI rendering decisions
	if (showLoading) {
		return (
			<div className="aspect-square w-full overflow-hidden rounded-xl bg-muted/10">
				<Skeleton className="h-full w-full rounded-xl" />
			</div>
		)
	}

	return (
		<div className="aspect-square w-full overflow-hidden rounded-xl bg-muted/10">
			<Image
				src={data!}
				width={400}
				height={400}
				alt="Product image"
				className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110 rounded-xl"
			/>
		</div>
	)
})

ListProductImageView.displayName = 'ListProductImageView'
