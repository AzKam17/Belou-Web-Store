'use client'

import {useParams} from 'next/navigation'
import {useEffect} from 'react'

export default function StorePage() {
    const params = useParams()

    useEffect(() => {
        console.log('Dynamic storeId:', params.id)
    }, [params])

    return (
        <div>
            <h1>Store ID: {params.id}</h1>
        </div>
    )
}
