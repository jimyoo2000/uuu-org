import { useRef, useEffect } from 'react'

export default function () {
  const mountRef = useRef(false)

  useEffect(() => {
    mountRef.current = true

    return () => {
      mountRef.current = false
    }
  }, [])

  return mountRef
}
