import { headers } from 'next/headers'
import { OrderStatus } from '@/types'

export function getSubDomain() {
	const host = window.location.hostname
	const parts = host.split('.')
	return parts[0]
}

// Server-compatible getSubDomain function
export async function getSubDomainSSC(): Promise<string> {
	const headerList = await headers()
	const host = headerList.get('host') || ''

	// Extract subdomain logic
	let subdomain = ''
	const hostParts = host.split('.')

	// Skip 'www' if it's the first part
	if (hostParts.length >= 2) {
		subdomain = hostParts[0] === 'www' ? hostParts[1] : hostParts[0]
	}
	return subdomain
}
