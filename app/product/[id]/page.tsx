'use client'

import { useParams } from 'next/navigation'
import { useGetProduct } from '@/data'
import { useMinimumLoadingTime } from '@/hooks'
import { ProductImagesCarousel } from '@/components/views/products/product-images-carousel'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { BackButton } from '@/components/ui/back-button'
import { ShareButton } from '@/components/ui/share-button'
import { useCartStore } from '@/store/cart-store'
import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductPage() {
    const params = useParams()
    const productId = params.id as string
    
    const { data: product, isLoading: isProductLoading } = useGetProduct(productId)
    
    const [quantity, setQuantity] = useState(1)
    const addItem = useCartStore(state => state.addItem)
    
    const isDataLoading = isProductLoading || !product
    const showLoading = useMinimumLoadingTime(isDataLoading)

    const handleAddToCart = () => {
        if (!product) return
        
        addItem(product.id, quantity)
        toast.success(`${product.name} ajouté au panier`)
    }

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1))
    }

    const totalPrice = product ? product.price * quantity : 0

    if (!showLoading && !product) return <div>Product not found</div>

    return (
        <div className="flex flex-col pb-32 md:pb-6 md:flex-row gap-8 py-6">
            <div className="w-full md:w-1/2">
                <div className="w-full mb-1">
                    <BackButton className="" />
                </div>
                
                {showLoading ? (
                    <Skeleton className="w-full aspect-square rounded-lg" />
                ) : (
                    <ProductImagesCarousel images={product.images} />
                )}
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center justify-between">
                    {showLoading ? (
                        <Skeleton className="h-10 w-3/4" />
                    ) : (
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                    )}
                    
                    {!showLoading && (
                        <ShareButton 
                            url={`/product/${product.id}`} 
                            title={product.name} 
                        />
                    )}
                </div>
                
                {showLoading ? (
                    <Skeleton className="h-8 w-32" />
                ) : (
                    <p className="text-2xl font-semibold">{product.price} FCFA</p>
                )}
                
                <div className="py-6">
                    {showLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ) : (
                        <div className="prose max-w-none">
                            {product.description ? (
                                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
                            ) : (
                                <p className="text-gray-500 italic">pas de description</p>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Quantity selector - only visible on desktop */}
                {!showLoading && (
                    <div className="hidden md:flex items-center">
                        <span className="mr-4 font-medium">Quantité:</span>
                        <div className="flex items-center border rounded-md">
                            <button 
                                onClick={decrementQuantity}
                                className="px-3 py-2 border-r hover:bg-gray-100"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                            <button 
                                onClick={incrementQuantity}
                                className="px-3 py-2 border-l hover:bg-gray-100"
                                aria-label="Increase quantity"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Desktop button - visible only on md screens and up */}
                <div className="hidden md:block">
                    {showLoading ? (
                        <Skeleton className="h-12 w-full" />
                    ) : (
                        <Button 
                            onClick={handleAddToCart} 
                            className="w-full py-6"
                            size="lg"
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Ajouter ({totalPrice} FCFA)
                        </Button>
                    )}
                </div>
            </div>
            
            {/* Mobile fixed button - visible only on smaller screens */}
            {!showLoading && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden z-10 mb-[60px]">
                    <Button 
                        onClick={handleAddToCart} 
                        className="w-full py-6"
                        size="lg"
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter ({totalPrice} FCFA)
                    </Button>
                </div>
            )}
        </div>
    )
}
