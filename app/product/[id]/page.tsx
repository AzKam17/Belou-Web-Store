'use client'

import { useParams } from 'next/navigation'
import { useGetProducts, useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { ProductImagesCarousel } from '@/components/views/products/product-images-carousel'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export default function ProductPage() {
    const params = useParams()
    const subdomain = useSubDomain()
    const { data: storeData } = useGetStore(subdomain)
    const { data: productsData } = useGetProducts(storeData?.id)
    
    const product = productsData?.find(p => p.id === params.id)

    if (!product) return <div>Product not found</div>

    const handleAddToCart = () => {
        // Here you would implement the logic to add the product to the cart
        // This could involve updating a context, local storage, or making an API call
        console.log('Adding to cart:', product)
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
