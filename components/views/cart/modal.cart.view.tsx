'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { ListProductCartView } from "../products"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export default function ModalCartView(
    props: {
        cartTotal: number,
        handleFinishOrder: () => void,
        handleContinueShopping: () => void,
    }
) {
    const [showCartModal, setShowCartModal] = useState(false)

    const cartItems = useCartStore(state => state.items)

    const cartTotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)

    const handleFinishOrder = () => {
        setShowCartModal(false)
        redirect('/cart')
    }

    const handleContinueShopping = () => {
        setShowCartModal(false)
        // toast.success(`${product.name} ajouté au panier`)
    }
    
    return (
        <Dialog open={showCartModal} onOpenChange={setShowCartModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Produit ajouté au panier</DialogTitle>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <ListProductCartView />
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t font-medium">
                        <span>Total</span>
                        <span>{cartTotal} FCFA</span>
                    </div>
                    
                    <DialogFooter className="flex flex-col gap-2 sm:flex-col">
                        <Button 
                            className="w-full" 
                            onClick={handleFinishOrder}
                        >
                            Finaliser ma commande
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleContinueShopping}
                        >
                            Continuer mes achats
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}

ModalCartView.displayName = 'ModalCartView'