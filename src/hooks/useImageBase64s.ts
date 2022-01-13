import { useState, useEffect } from 'react'

export const useImageBase64s = (imageFiles?: FileList) => {
  const [imageBase64s, setImageBase64s] = useState<string[]>([])

  useEffect(() => {
    setImageBase64s([])
    const isExistImageFiles = !!imageFiles?.length
    if (!isExistImageFiles) return
    Array.from(imageFiles).forEach((imageFile) => {
      const reader = new FileReader()
      reader.onload = () => {
        const imageBase64 = reader.result
        if (typeof imageBase64 !== 'string') return
        setImageBase64s((preBase64s) => [...preBase64s, imageBase64])
      }
      reader.readAsDataURL(imageFile)
    })
  }, [imageFiles])

  return {
    imageBase64s,
  }
}
