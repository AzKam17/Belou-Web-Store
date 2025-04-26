'use client'

import React from 'react'

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
            gcTime: 1000 * 60 * 5,
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        },
    },
})
  
const persister = createSyncStoragePersister({
    storage: window.localStorage,
})

  
export function Providers({children}: { children: ReactNode }) {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            {children}
        </PersistQueryClientProvider>
    )
}
