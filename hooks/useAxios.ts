import { useSubDomain } from '@/hooks/useSubDomain'
import axios, {
	AxiosError,
	AxiosInstance,
} from 'axios'
import React from 'react'

export const useAxios = function () {
	const subdomain = useSubDomain()
	const [baseURL, setBaseURL] = React.useState<string>('')

	React.useEffect(() => {
		const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

		if (!BACKEND_URL) {
			console.warn(
				'Backend server URL is not defined. API requests may fail.',
			)
		}

		setBaseURL(BACKEND_URL)
	}, [])

	const axiosIns = React.useMemo(() => {
		const instance: AxiosInstance = axios.create({
			baseURL,
			timeout: 30000,
			headers: {
				subdomain,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		})

		instance.interceptors.response.use(
			(res) => res,
			(error: AxiosError) => {
				console.error(error)
				return Promise.reject(error)
			},
		)

		return instance
	}, [baseURL, subdomain])

	return {
		axiosIns
	}
}
