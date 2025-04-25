'use client'

import { useParams } from 'next/navigation'
import { useGetProducts, useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { ProductImagesCarousel } from '@/components/views/products/product-images-carousel'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

export default function ProductPage() {
    const params = useParams()
    const subdomain = useSubDomain()
    const { data: storeData } = useGetStore(subdomain)
    const { data: productsData } = useGetProducts(storeData?.id)
    const [quantity, setQuantity] = useState(1)
    
    const product = productsData?.find(p => p.id === params.id)

    if (!product) return <div>Product not found</div>

    const handleAddToCart = () => {
        // Here you would implement the logic to add the product to the cart
        // This could involve updating a context, local storage, or making an API call
        console.log('Adding to cart:', product, 'Quantity:', quantity)
    }

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1))
    }

    return (
        <div className="flex flex-col pb-20 md:pb-6 md:flex-row gap-8 py-6">
            <div className="w-full md:w-1/2">
                <ProductImagesCarousel images={product.images} />
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-semibold mt-2">{product.price} FCFA</p>
                </div>
                
                <div className="py-6">
                    <div className="prose max-w-none">
                        {product.description ? (
                            <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
                        ) : (
                            <p className="text-gray-500 italic">pas de description</p>
                        )}
                    </div>
                </div>
                
                {/* Quantity selector - only visible on desktop */}
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
                
                {/* Desktop button - visible only on md screens and up */}
                <div className="hidden md:block">
                    <Button 
                        onClick={handleAddToCart} 
                        className="w-full py-6"
                        size="lg"
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter
                    </Button>
                </div>
            </div>
            
            {/* Mobile fixed button - visible only on smaller screens */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden z-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Quantité:</span>
                    <div className="flex items-center border rounded-md">
                        <button 
                            onClick={decrementQuantity}
                            className="px-2 py-1 border-r hover:bg-gray-100"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-center min-w-[2.5rem]">{quantity}</span>
                        <button 
                            onClick={incrementQuantity}
                            className="px-2 py-1 border-l hover:bg-gray-100"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <Button 
                    onClick={handleAddToCart} 
                    className="w-full py-6"
                    size="lg"
                >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter
                </Button>
            </div>
        </div>
    )
}
