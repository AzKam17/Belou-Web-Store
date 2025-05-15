'use client'

import React, {useEffect} from 'react'

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import {ReactNode, useState} from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 10,
            staleTime: 1000 * 10,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: true,
        },
    },
})
  
export function Providers({children}: { children: ReactNode }) {
    const [persister, setPersister] = useState<any>(null)

    useEffect(() => {
        const localPersister = createSyncStoragePersister({
            storage: window.localStorage,
        })
        setPersister(localPersister)
    }, [])

    if (!persister) {
        return null 
    }

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            {children}
        </PersistQueryClientProvider>
    )
}
