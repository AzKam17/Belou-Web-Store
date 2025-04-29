import { Metadata } from 'next'
import { META } from '@/utils'
import CheckoutPageClientComponent from '@/components/views/checkout/checkout.page.client.component'


export async function generateMetadata(): Promise<Metadata> {
    return META.DEFAULT_CHECKOUT
}

export default function CheckoutPage() {
    return <CheckoutPageClientComponent />
}