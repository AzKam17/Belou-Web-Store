'use client'

import { ListProductCartView } from '@/components/views/products/list-product-cart.view'
import { BackButton } from '@/components/ui/back-button'

export default function CartPage() {
    return (
        <div className="space-y-6 pb-30">
            <BackButton />
            <h1 className="text-2xl font-bold">Mon Panier</h1>
            <ListProductCartView />
        </div>
    )
}