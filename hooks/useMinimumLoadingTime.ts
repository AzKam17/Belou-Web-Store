'use client'

import { useState, useEffect } from 'react'

/**
 * Hook that ensures a loading state is shown for at least a minimum amount of time
 * This prevents flickering when data loads very quickly
 * 
 * @param isLoading - Boolean indicating if the data is currently loading
 * @param minimumLoadingTime - Minimum time in milliseconds to show loading state (default: 500ms)
 * @returns Boolean indicating if loading state should be shown
 */
export function useMinimumLoadingTime(
  isLoading: boolean,
  minimumLoadingTime: number = 200
): boolean {
  const [showLoading, setShowLoading] = useState<boolean>(true)
  
  useEffect(() => {
    if (!isLoading) {
      // Data is loaded, but we'll keep showing loading state for at least the minimum time
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, minimumLoadingTime)
      
      return () => clearTimeout(timer)
    } else {
      setShowLoading(true)
    }
  }, [isLoading, minimumLoadingTime])
  
  return showLoading
}