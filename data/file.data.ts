import { useAxios } from '@/hooks/useAxios'
import { Guard } from '@/utils'
import { useQueries, useQuery } from '@tanstack/react-query'

export function useFilePublicUrl(params: {
	path: string,
}) {
	const { formatUrl } = useAxios()
	return useQuery({
		enabled: !Guard.isEmpty(params.path),
		queryKey: [`image_${params.path}`],
		queryFn: async function() {
			return await formatUrl({
				path: `/assets/${params.path}`,
			})
		},
	})
}

export function useFilePublicUrls(paths: string[]) {
	const { formatUrl } = useAxios()

	return useQueries({
		queries: paths.map(path => ({
			queryKey: [`image_${path}`],
			queryFn: async () => {
				if (Guard.isEmpty(path)) return null
				return formatUrl({ path: `/assets/${path}` })
			},
			enabled: !Guard.isEmpty(path),
		})),
	})
}