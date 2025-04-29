import { getProductInfoCache } from '@/data'
import { Metadata } from 'next'
import { Guard, META } from '@/utils'
import { ProductPageE } from '@/components/views/products/product.page'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const productId = await params.id;

        const {data, error} = await getProductInfoCache(productId)
        if (error) return META.DEFAULT_PRODUCT

        return {
            title: `${data.name} - ${data.stores.name}`,
            description: !Guard.isEmpty(data.description) ? data.description : `Achetez ${data.name} chez ${data.stores.name}` ,
            openGraph: {
                title: data.name,
                description: data.description,
                images: [data.images[0]],
            },
        }
    } catch (error) {
        return META.DEFAULT_PRODUCT
    }
}

export default function ProductPage() {
    return <ProductPageE />
}
