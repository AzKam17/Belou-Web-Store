'use client'

import { useEffect, useState } from 'react'

export function useSubDomain(): string {
	const [subdomain, setSubdomain] = useState<string>('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN
			const host = window.location.hostname

			if (mainDomain && host.endsWith(mainDomain)) {
				const sub = host.replace(`.${mainDomain}`, '')
				// Avoid setting the whole domain if no subdomain exists
				if (sub !== host) {
					setSubdomain(sub)
				}
			}
		}
	}, [])

	return subdomain
}
