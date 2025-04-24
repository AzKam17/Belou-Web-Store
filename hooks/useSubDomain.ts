'use client'

import { useEffect, useState } from 'react'

export function useSubDomain(): string {
	const [subdomain, setSubdomain] = useState<string>('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const host = window.location.hostname
			const parts = host.split('.')

			setSubdomain(parts[0])
		}
	}, [])

	return subdomain
}
