'use client'

import { useFilePublicUrl } from '@/data/file.data'
import { useMemo, useState, useRef } from 'react'
import Image from 'next/image'

interface ProductImagesCarouselProps {
    images: string[]
}

export function ProductImagesCarousel({ images }: ProductImagesCarouselProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    // @ts-ignore
    const [startThumbnailIndex, setStartThumbnailIndex] = useState(0)
    const maxVisibleThumbnails = 5
    const thumbnailsContainerRef = useRef<HTMLDivElement>(null)
    
    function useImageResults(imageUrls: any[]) {
        return imageUrls.map(url => useFilePublicUrl(url));
    }
    
    // Inside your component:
    const imageUrls = useMemo(() => {
        return images?.map(imagePath => ({
            bucket: 'product-pictures',
            publicBucket: true,
            path: imagePath
        })) || []
    }, [images]);
    
    const imageResults = useImageResults(imageUrls);
    
    // @ts-ignore
    const handlePrevImage = () => {
        setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : imageResults.length - 1))
    }

    // @ts-ignore
    const handleNextImage = () => {
        setSelectedImageIndex(prev => (prev < imageResults.length - 1 ? prev + 1 : 0))
    }

    const handlePrevThumbnails = () => {
        setStartThumbnailIndex(prev => Math.max(0, prev - maxVisibleThumbnails))
    }

    const handleNextThumbnails = () => {
        setStartThumbnailIndex(prev => 
            Math.min(imageResults.length - maxVisibleThumbnails, prev + maxVisibleThumbnails)
        )
    }
    
    if (imageResults.some(result => result.isPending)) {
        return <div>Loading...</div>
    }

    const showThumbnailControls = imageResults.length > maxVisibleThumbnails

    return (
        <div className="space-y-2">
            {/* Main large image with navigation arrows */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/10">
                {imageResults[selectedImageIndex]?.data && (
                    <Image
                        src={imageResults[selectedImageIndex].data}
                        width={600}
                        height={600}
                        alt={`Product image ${selectedImageIndex + 1}`}
                        className="h-full w-full object-cover object-center"
                    />
                )}
                
                {/* Main image navigation arrows */}
                {imageResults.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button 
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
            
            {/* Thumbnail navigation */}
            {imageResults.length > 1 && (
                <div className="relative">
                    {/* Scrollable thumbnails container */}
                    <div 
                        ref={thumbnailsContainerRef}
                        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x"
                        style={{ 
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {imageResults.map((result, index) => {
                            return result.data && (
                                <div 
                                    key={index} 
                                    className={`flex-shrink-0 aspect-square w-[80px] overflow-hidden rounded-lg cursor-pointer transition-all snap-start ${
                                        selectedImageIndex === index ? 'ring-2 ring-primary' : 'hover:opacity-80'
                                    }`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <Image
                                        src={result.data}
                                        width={100}
                                        height={100}
                                        alt={`Product thumbnail ${index + 1}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    
                    {/* Navigation arrows (optional, can be kept for additional navigation) */}
                    {showThumbnailControls && (
                        <>
                            <button 
                                onClick={() => {
                                    if (thumbnailsContainerRef.current) {
                                        thumbnailsContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
                                    }
                                }}
                                className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md"
                                aria-label="Scroll thumbnails left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => {
                                    if (thumbnailsContainerRef.current) {
                                        thumbnailsContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
                                    }
                                }}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md"
                                aria-label="Scroll thumbnails right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}