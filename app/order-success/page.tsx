'use client'

import React, { useEffect } from 'react'
import { useCartStore, CartItem } from '@/store/cart-store'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Check, Printer } from 'lucide-react'

export default function OrderSuccessPage() {
    const { items, clearCart } = useCartStore()
    
    // Calculate total price
    const totalPrice = items.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)
    
    // Clear cart after showing the receipt (optional)
    useEffect(() => {
        // We don't clear immediately to allow the receipt to be displayed
        // You could add a timeout here if you want to clear after some time
        // setTimeout(() => clearCart(), 60000); // Clear after 1 minute
    }, [clearCart])
    
    // Handle print functionality
    const handlePrint = () => {
        window.print()
    }
    
    return (
        <div className="container mx-auto p-4 max-w-lg print:max-w-full print:shadow-none">
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
                    <p className="text-center text-gray-500 text-sm">
                        {new Date().toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                
                {/* Items list */}
                <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm font-medium text-gray-500 border-b pb-2">
                        <span className="w-1/2">Article</span>
                        <span className="w-1/6 text-center">Qté</span>
                        <span className="w-1/6 text-right">Prix</span>
                        <span className="w-1/4 text-right">Total</span>
                    </div>
                    
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span className="w-1/2 truncate">{item.name}</span>
                            <span className="w-1/6 text-center">{item.quantity}</span>
                            <span className="w-1/6 text-right">{item.price}</span>
                            <span className="w-1/4 text-right">{item.price * item.quantity} FCFA</span>
                        </div>
                    ))}
                </div>
                
                {/* Totals */}
                <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between font-medium">
                        <span>Sous-total</span>
                        <span>{totalPrice} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Frais de livraison</span>
                        <span>À déterminer</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>{totalPrice} FCFA</span>
                    </div>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Mode de paiement: Paiement à la livraison</p>
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