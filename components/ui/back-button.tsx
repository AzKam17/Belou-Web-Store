'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  className?: string
}

export function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Button 
      variant="ghost" 
      onClick={handleBack} 
      className={`pl-0 hover:bg-transparent cursor-pointer ${className}`}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
  )
}