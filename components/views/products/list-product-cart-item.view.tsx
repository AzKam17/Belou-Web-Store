'use client'

import { CartItem } from '@/store/cart-store'
import React from 'react'
import { ListProductImageView } from './list-product-image.view'
import { X, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartStore } from '@/store/cart-store'

interface ListProductCartItemViewProps {
    product: CartItem;
    onRemove?: (id: string) => void;
}

export const ListProductCartItemView = React.memo((props: ListProductCartItemViewProps) => {
    const { product } = props
    const removeItem = useCartStore(state => state.removeItem)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    
    const handleRemove = () => {
        removeItem(product.productId)
    }
    
    const incrementQuantity = () => {
        updateQuantity(product.productId, product.quantity + 1)
    }
    
    const decrementQuantity = () => {
        if (product.quantity > 1) {
            updateQuantity(product.productId, product.quantity - 1)
        } else {
            removeItem(product.productId)
        }
    }
    
    return (
        <div className="flex items-center space-x-4 py-2 border-b last:border-b-0">
            <Link href={`/product/${product.productId}`} className="w-16 h-16 flex-shrink-0">
                <ListProductImageView imagePath={product.image} />
            </Link>
            
            <div className="flex-1">
                <Link href={`/product/${product.productId}`}>
                    <h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                
                <div className="flex items-center mt-1">
                    <span className="text-sm text-muted-foreground">{product.price} FCFA</span>
                </div>
                
                <div className="text-sm font-medium mt-1">
                    {product.price * product.quantity} FCFA
                </div>
            </div>
            
            {/* Quantity controls moved next to remove button */}
            <div className="flex items-center border rounded-md mr-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0" 
                    onClick={decrementQuantity}
                    aria-label="Decrease quantity"
                >
                    <Minus className="h-3 w-3" />
                </Button>
                <span className="px-2 text-sm min-w-[1.5rem] text-center">{product.quantity}</span>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0" 
                    onClick={incrementQuantity}
                    aria-label="Increase quantity"
                >
                    <Plus className="h-3 w-3" />
                </Button>
            </div>
            
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                onClick={handleRemove}
                aria-label="Remove item"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
})

ListProductCartItemView.displayName = 'ListProductCartItemView'