
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BackButton } from '@/components/ui/back-button'
import { ListProductCartView } from '@/components/views/products/list-product-cart.view'
import { Metadata } from 'next'
import { META } from '@/utils'
import { ConfirmCartButton } from '@/components/views/cart/confirm.cart.button'

export async function generateMetadata(): Promise<Metadata> {
    return META.DEFAULT_CART
}

export default function CartPage() {
    return (
        <div className="space-y-6 pb-30">
            <BackButton />
            <h1 className="text-2xl font-bold">Mon Panier</h1>
            <ListProductCartView />
            <div className="pt-4">
                <ConfirmCartButton />
            </div>
        </div>
    )
}