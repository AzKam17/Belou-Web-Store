'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, Printer } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useGetOrder } from '@/data'
import { BackButton } from '@/components/ui/back-button'
import { Skeleton } from '@/components/ui/skeleton'

export default function OrderSuccessPage() {
    const params = useParams()
    const orderId = params.id as string
    const { data, isPending, isError } = useGetOrder(orderId)
    
    // Handle print functionality
    const handlePrint = () => {
        window.print()
    }

    if (isPending) {
        return (
            <div className="space-y-6">
                <BackButton />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="space-y-6">
                <BackButton />
                <div className="text-center py-12">
                    <h1 className="text-2xl font-semibold mb-2">Commande introuvable</h1>
                    <p className="text-gray-600 mb-6">Nous n'avons pas pu trouver les détails de cette commande.</p>
                    <Link href="/">
                        <Button>Retour à la boutique</Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Calculate total from items
    const totalAmount = data.total_amount || 0

    return (
        <div className="space-y-6 pb-30">
            <BackButton className="print:hidden" />
            
            <div className="text-center mb-6 print:hidden">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                </div>
                <h1 className="text-2xl font-semibold mb-2">Commande réussie !</h1>
                <p className="text-gray-600">Merci pour votre commande. Voici votre reçu :</p>
            </div>
            
            {/* Receipt */}
            <div className="bg-white rounded-lg border p-6 mb-6 shadow-sm print:shadow-none print:border-0 print:p-0">
                {/* Logo and Header */}
                <div className="flex flex-col items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold text-center">REÇU DE COMMANDE</h2>
                    <p className="text-sm text-gray-500">Numéro de commande: {data.order_number}</p>
                    <p className="text-center text-gray-500 text-sm">
                        {new Date(data.created_at).toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                
                {/* Customer Information */}
                <div className="mb-6 border-b pb-4">
                    <h3 className="font-medium mb-2">Informations client</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p className="text-gray-500">Nom:</p>
                            <p>{data.full_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Téléphone:</p>
                            <p>{data.phone_number}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Adresse:</p>
                            <p>{data.address}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Ville:</p>
                            <p>{data.city}</p>
                        </div>
                    </div>
                    {data.notes && (
                        <div className="mt-2">
                            <p className="text-gray-500">Notes:</p>
                            <p className="text-sm">{data.notes}</p>
                        </div>
                    )}
                </div>
                
                {/* Items list */}
                <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm font-medium text-gray-500 border-b pb-2">
                        <span className="w-1/2">Article</span>
                        <span className="w-1/6 text-center">Qté</span>
                        <span className="w-1/6 text-right">Prix</span>
                        <span className="w-1/4 text-right">Total</span>
                    </div>
                    
                    {
                        // @ts-ignore
                        data.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="w-1/2 truncate">Produit {index + 1}</span>
                                <span className="w-1/6 text-center">{item.quantity}</span>
                                <span className="w-1/6 text-right">{item.price}</span>
                                <span className="w-1/4 text-right">{item.price * item.quantity} FCFA</span>
                            </div>
                        ))
                    }
                </div>
                
                {/* Totals */}
                <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between font-medium">
                        <span>Sous-total</span>
                        <span>{totalAmount} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Frais de livraison</span>
                        <span>À déterminer</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>{totalAmount} FCFA</span>
                    </div>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Mode de paiement: {data.payment_method === 'cashOnDelivery' ? 'Paiement à la livraison' : data.payment_method}</p>
                    <p className="mt-1">Statut: <span className="font-medium capitalize">{data.status}</span></p>
                    <p className="mt-1">Nous vous contacterons bientôt pour confirmer votre commande.</p>
                </div>
            </div>
            
            <div className="flex justify-between print:hidden">
                <Link href="/">
                    <Button variant="outline" className="px-6">
                        Retour à la boutique
                    </Button>
                </Link>
                
                <Button onClick={handlePrint} className="px-6">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer le reçu
                </Button>
            </div>
            
            {/* Print-specific styles */}
            <style jsx global>{`
                @media print {
                    body {
                        padding: 0;
                        margin: 0;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    )
}