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
  smScreen: boolean
  mdScreen: boolean
  lgScreen: boolean
  xlScreen: boolean
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

  return {
    screenSize,
    smScreen: screenSize.width >= 640,
    mdScreen: screenSize.width >= 768,
    lgScreen: screenSize.width >= 1024,
    xlScreen: screenSize.width >= 1280
  }
}
