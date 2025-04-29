import React from 'react'
import { Metadata } from 'next'
import { META } from '@/utils'
import OrderSuccessPageComponent from '@/components/views/order-success/order-success.page.components'


export async function generateMetadata(): Promise<Metadata> {
    return META.DEFAULT_ORDER_SUCCESS
}


export default function OrderSuccessPage() {
    return <OrderSuccessPageComponent />
}