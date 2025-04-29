'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'



export const ConfirmCartButton = React.memo(() => {
    const { items } = useCartStore()

    return <>
        {
            items.length > 0 && <Link href="/checkout">
            <Button
                className="w-full sm:w-auto sm:px-6 sm:py-2 sm:text-base sm:float-right"
            >
                    Confirmer ma commande
                </Button>
            </Link>
        }
    </>
})


ConfirmCartButton.displayName = 'ConfirmCartButton'