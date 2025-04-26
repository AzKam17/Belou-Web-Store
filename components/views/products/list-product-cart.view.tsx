'use client'

import React from 'react'
import { useCartStore } from '@/store/cart-store'
import { ListProductCartItemView } from './list-product-cart-item.view'

export const ListProductCartView = React.memo(() => {
    const { items } = useCartStore()
    
    // Calculate total price of all items in cart
    const totalPrice = items.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)
    
    // If cart is empty, show a message
    if (items.length === 0) {
        return (
            <div className="py-8 text-center">
                <p className="text-muted-foreground">Votre panier est vide</p>
            </div>
        )
    }
    
    return (
        <div className="space-y-2">
            {/* List of cart items */}
            {items.map((item, index) => (
                <div key={index}>
                    <ListProductCartItemView product={item} />
                </div>
            ))}
            
            {/* Total price display */}
            <div className="flex justify-between items-center pt-4 mt-4 border-t font-medium">
                <span>Total</span>
                <span>{totalPrice} FCFA</span>
            </div>
        </div>
    )
})

ListProductCartView.displayName = 'ListProductCartView'
