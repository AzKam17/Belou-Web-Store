'use client'

import { ListProductCartView } from "@/components/views/products"
import { useCartStore } from "@/store/cart-store"

export default function CartPage() {
    return (
        <div>
            <ListProductCartView />
        </div>
    )
}