'use client'

import { useParams } from 'next/navigation'
import { useGetProducts, useGetStore } from '@/data'
import { useSubDomain } from '@/hooks/useSubDomain'
import { ProductImagesCarousel } from '@/components/views/products/product-images-carousel'

export default function ProductPage() {
    const params = useParams()
    const subdomain = useSubDomain()
    const { data: storeData } = useGetStore(subdomain)
    const { data: productsData } = useGetProducts(storeData?.id)
    
    const product = productsData?.find(p => p.id === params.id)

    if (!product) return <div>Product not found</div>

    return (
        <div className="flex flex-col md:flex-row gap-8 py-6">
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
                            <p className="text-gray-500 italic">Pas de description</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
