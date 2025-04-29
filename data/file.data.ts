import { Guard, useSupabase } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export function useFilePublicUrl(params: {
	bucket: string, path: string, publicBucket: boolean
}) {
	const supabase = useSupabase()
	return useQuery({
		enabled: !Guard.isEmpty(params.path),
		queryKey: [`image_${params.path}`, params.path],
		queryFn: async () => {
			const { data } = supabase.storage
				.from(params.bucket)
				.getPublicUrl(params.path)

			return data?.publicUrl
		},
	})
}
