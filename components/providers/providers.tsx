'use client'

import React from 'react'

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import {ReactNode, useState} from 'react'

export function Providers({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 5, // 5 minutes
            },
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
