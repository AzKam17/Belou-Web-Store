import { ListProductsView } from '@/components/views/products'
import { getStoreInfoCache } from '@/data'
import { META, supabase } from '@/utils'
import { getSubDomainSSC } from '@/utils/misc'
import { useQuery } from '@tanstack/react-query'
import { Metadata } from 'next'
import { cache } from 'react'


type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
	const subdomain = await getSubDomainSSC()

	if (!subdomain) return META.DEFAULT

	try {
		const { data, error } = await getStoreInfoCache(subdomain)

		if (error || !data) return META.DEFAULT

		return {
			title: data.name || 'Belou Store',
			description: data.description || 'Découvrez notre boutique en ligne.',
			applicationName: 'Belou Store',
			themeColor: '#fafafa',
			openGraph: {
				title: data.name || 'Belou Store',
				description: data.description || 'Découvrez notre boutique en ligne.',
			},
		}
	} catch (error) {
		return META.DEFAULT
	}
}

export default function Home() {
	return <>
		<ListProductsView />
	</>
}
