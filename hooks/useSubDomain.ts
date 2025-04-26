'use client'

import { use, useEffect, useState } from 'react'

export function useSubDomain(): string {
	const [subdomain, setSubdomain] = useState<string>('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const host = window.location.hostname
			const parts = host.split('.')
			setSubdomain(() => {
				console.log(parts.length)
				return parts.length > 1 ? parts[0] : ''
			})
		}
	}, [])

	useEffect(() => {
		console.log(subdomain)
	}, [subdomain])

	return subdomain
}
