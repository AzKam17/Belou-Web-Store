'use client'

import React, { useState, useEffect } from 'react'
import { useSubDomain } from '@/hooks/useSubDomain'
import { Header } from '@/components/views'
import { Guard } from '@/utils'
import Image from 'next/image'
import { AppStoreButton, GooglePlayButton } from 'react-mobile-app-button'

interface MainContentProps {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  const subdomain = useSubDomain()
  const [currentPlatform, setCurrentPlatform] = useState(0)
  const [animationState, setAnimationState] = useState('visible')
  
  // Get app store links from environment variables
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || 'https://apps.apple.com/app/belou'
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=app.belou'
  
  const platforms = [
    'WhatsApp',
    'Facebook',
    'Instagram',
    'Twitter',
    'TikTok',
    'Snapchat'
  ]
  
  useEffect(() => {
    if (Guard.isEmpty(subdomain)) {
      const interval = setInterval(() => {
        // Start fade out animation
        setAnimationState('fadeOut')
        
        setTimeout(() => {
          // Change platform when invisible
          setCurrentPlatform((prev) => (prev + 1) % platforms.length)
          // Start fade in animation
          setAnimationState('fadeIn')
        }, 500) // Half of the interval for the transition
        
        setTimeout(() => {
          // Reset to visible state
          setAnimationState('visible')
        }, 1000) // Reset after fade in completes
      }, 2500) // Total time for each platform
      
      return () => clearInterval(interval)
    }
  }, [subdomain, platforms.length])
  
  if (Guard.isEmpty(subdomain)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-6 sm:px-4 text-center">
        <div className="max-w-md">
          <div className="flex justify-center mb-8">
            <Image 
              src="/belou.svg" 
              alt="Belou Logo" 
              width={300} 
              height={100} 
              className="text-orange-500"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Vendez sur{' '}
            <span 
              className={`inline-block min-w-32 text-[#FE4000] animate__animated ${
                animationState === 'fadeOut' 
                  ? 'animate__fadeOutUp' 
                  : animationState === 'fadeIn' 
                  ? 'animate__fadeInUp' 
                  : ''
              }`}
            >
              {platforms[currentPlatform]}
            </span>
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            Commencez à vendre vos produits en quelques minutes avec Belou, 
            la solution simple pour créer votre boutique en ligne.
          </p>
          
          <div className="flex justify-center w-full">
            <div className="flex flex-col sm:flex-row gap-6">
              <AppStoreButton
                url={appStoreUrl}
                theme="dark"
                width={180}
                height={50}
              />
              
              <GooglePlayButton
                url={playStoreUrl}
                theme="dark"
                width={180}
                height={50}
              /> 
            </div>
          </div>
          
          <p className="text-gray-500 mt-10 text-sm">
            Rejoignez des milliers de vendeurs qui utilisent déjà Belou pour développer leur activité.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Header />
      <div className="w-full border-b mb-4"></div>
      {children}
    </>
  )
}