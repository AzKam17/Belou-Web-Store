'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation' 
import { BackButton } from '@/components/ui/back-button'
import { useCreateOrder, useGetStore } from '@/data'
import { useSubDomain } from '@/hooks'
import { useCartStore } from '@/store/cart-store'
import { toast } from 'sonner' 
import * as Sentry from '@sentry/nextjs'
import { Skeleton } from '@/components/ui/skeleton'

type FormData = {
    full_name: string,
    phone_number: string,
    address: string,
    city: string,
    payment_method: string,
    notes?: string,
}

export default function CheckoutPageClientComponent() {
    const router = useRouter() 
    const subdomain = useSubDomain()
    const { items, clearCart } = useCartStore()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const { isPending: isStorePending, data: storeData } = useGetStore(subdomain)
    const {mutate, isPending, isError, data, error} = useCreateOrder()
    
    const onSubmit = (data: FormData) => {
        mutate({
            ...data,
            store_id: storeData?.id,
            forwarded_total: items.reduce((total, item) => total + item.price * item.quantity, 0),
            cart_items: items.map(item => ({
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        }, {
            onSuccess: (orderData) => {
                clearCart()
                router.push(`/order-success/${orderData.id}`)
            },
            onError: (err) => {
                console.log('Error creating order:', err)
                
                Sentry.captureException(err, {
                    extra: {
                        formData: data,
                        storeId: subdomain,
                        cartItemCount: items.length,
                        totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0)
                    }
                })
                
                toast.error('Une erreur est survenue. Veuillez réessayer plus tard.')
            }
        })
    }

    if (isStorePending) {
        return (
            <div className="space-y-6 pb-30">
                <BackButton className="" />
                <Skeleton className="h-8 w-3/4 mb-6" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i}>
                            <Skeleton className="h-5 w-1/3 mb-1" />
                            <Skeleton className="h-10 w-full rounded" />
                        </div>
                    ))}
                    <div>
                        <Skeleton className="h-5 w-1/3 mb-1" />
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-5 w-1/2" />
                        </div>
                    </div>
                    <Skeleton className="h-12 w-full rounded-md mt-4" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 pb-30">
            <BackButton className="" />
            <h1 className="text-2xl font-bold">Confirmation de la commande</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="full_name" className="block font-medium mb-1">Nom complet</label>
                    <input
                        type="text"
                        id="full_name"
                        {...register('full_name', { required: 'Le nom complet est requis' })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Votre nom complet"
                    />
                    {errors.full_name && <span className="text-red-500 text-sm">{errors.full_name.message}</span>}
                </div>
                <div>
                    <label htmlFor="phone_number" className="block font-medium mb-1">Numéro de téléphone</label>
                    <input
                        type="tel"
                        id="phone_number"
                        {...register('phone_number', {
                            required: 'Le numéro de téléphone est requis',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Le numéro doit contenir exactement 10 chiffres'
                            }
                        })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Ex: 0700000000"
                    />
                    {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number.message}</span>}
                </div>
                <div>
                    <label htmlFor="address" className="block font-medium mb-1">Adresse de livraison</label>
                    <input
                        type="text"
                        id="address"
                        {...register('address', { required: 'L\'adresse de livraison est requise' })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Votre adresse"
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                </div>
                <div>
                    <label htmlFor="city" className="block font-medium mb-1">Ville</label>
                    <input
                        type="text"
                        id="city"
                        {...register('city', { required: 'La ville est requise' })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Votre ville"
                    />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                </div>
                <div>
                    <label htmlFor="notes" className="block font-medium mb-1">Notes (optionnel)</label>
                    <textarea
                        id="notes"
                        {...register('notes')}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Informations supplémentaires pour la livraison"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Méthode de paiement</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="cashOnDelivery"
                            value="cashOnDelivery"
                            {...register('payment_method', { required: true })}
                            checked
                            readOnly
                            className="accent-primary"
                        />
                        <label htmlFor="cashOnDelivery" className="ml-2">Paiement à la livraison</label>
                    </div>
                </div>
                <button
                    type="submit"
                    className={`w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition ${isPending? 'cursor-not-allowed' : ''}`}
                >
                    {isPending ? 'En cours...' : 'Passer la commande'}
                </button>
            </form>
        </div>
    )
}


CheckoutPageClientComponent.displayName = 'CheckoutPageClientComponent'