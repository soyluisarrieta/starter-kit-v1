import { useState, useLayoutEffect } from 'react'

interface Dimension {
  width: number
  height: number
}

function getCurrentDimension (): Dimension {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export function useScreenSize (): {
  screenSize: Dimension
  isMobile: boolean
  isDesktop: boolean
} {
  const [screenSize, setScreenSize] = useState(getCurrentDimension)

  useLayoutEffect(() => {
    const updateDimension = (): void => {
      setScreenSize(getCurrentDimension)
    }

    window.addEventListener('resize', updateDimension)

    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [])

  const isMobile = screenSize.width < 768
  const isDesktop = screenSize.width >= 768

  return { screenSize, isMobile, isDesktop }
}
