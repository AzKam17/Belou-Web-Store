'use client'

import React from 'react'
import { useCartStore } from '@/store/cart-store'
import { ListProductCartItemView } from './list-product-cart-item.view'


export const ListProductCartView = React.memo(() => {
    const { items } = useCartStore()
    return items.map((item, index) => {
            return <div key={index}>
                <ListProductCartItemView product={item} />
            </div>
        })
})


ListProductCartView.displayName = 'ListProductCartView'
