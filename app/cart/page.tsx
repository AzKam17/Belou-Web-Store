'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BackButton } from '@/components/ui/back-button'
import { ListProductCartView } from '@/components/views/products/list-product-cart.view'

export default function CartPage() {
    return (
        <div className="space-y-6 pb-30">
            <BackButton />
            <h1 className="text-2xl font-bold">Mon Panier</h1>
            <ListProductCartView />
            <div className="pt-4">
                <Link href="/checkout">
                    <Button
                        className="w-full sm:w-auto sm:px-6 sm:py-2 sm:text-base sm:float-right"
                    >
                        Confirmer ma commande
                    </Button>
                </Link>
            </div>
        </div>
    )
}