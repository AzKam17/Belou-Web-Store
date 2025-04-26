'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation' // Import useRouter
import Link from 'next/link'
import { BackButton } from '@/components/ui/back-button'

type FormData = {
    fullName: string
    phoneNumber: string
    address: string
    city: string
    paymentMethod: string
    notes?: string
}

export default function CheckoutPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()
    const router = useRouter() // Initialize router

    const onSubmit = (data: FormData) => {
        // Handle form submission logic here (e.g., send data to backend)
        console.log('Order information submitted:', data)

        // Redirect to the order success page
        router.push('/order-success')

        // Optionally reset the form if needed, though redirection might make it unnecessary
        // reset()
    }

    return (
        <div className="space-y-6 pb-30 max-w-lg mx-auto">
            <BackButton className="" />
            <h1 className="text-2xl font-bold">Confirmation de la commande</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="fullName" className="block font-medium mb-1">Nom complet</label>
                    <input
                        type="text"
                        id="fullName"
                        {...register('fullName', { required: 'Le nom complet est requis' })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Votre nom complet"
                    />
                    {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block font-medium mb-1">Numéro de téléphone</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        {...register('phoneNumber', { required: 'Le numéro de téléphone est requis' })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Ex: 0700000000"
                    />
                    {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
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
                            {...register('paymentMethod', { required: true })}
                            checked
                            readOnly
                            className="accent-primary"
                        />
                        <label htmlFor="cashOnDelivery" className="ml-2">Paiement à la livraison</label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition"
                >
                    Confirmer la commande
                </button>
            </form>
        </div>
    )
}