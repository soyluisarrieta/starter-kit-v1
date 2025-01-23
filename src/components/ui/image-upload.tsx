import { cn } from '@/lib/utils'
import React, { forwardRef, useEffect, useState } from 'react'

interface ImageUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  image?: string;
  onChange: (file: File) => void;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(({ onChange, image, accept, ...fieldProps }, ref) => {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onChange(file)
        setPreviewUrl(URL.createObjectURL(file))
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (file.type.startsWith('image/')) {
        onChange(file)
        setPreviewUrl(URL.createObjectURL(file))
      }
    }
  }

  useEffect(()=>{
    image && setPreviewUrl(image)
  },[image])

  return (
    <div
      className={cn(
        'flex flex-col justify-start w-full',
        isDragging ? 'border-primary bg-primary/10' : ''
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className={cn(
          'relative aspect-square flex items-center justify-center w-32 px-4 transition-colors border-2 border-dashed rounded-md cursor-pointer text-muted-foreground hover:border-primary hover:bg-primary/5',
          isDragging ? 'border-primary bg-primary/5' : ''
        )}
      >
        {/* Input oculto */}
        <input
          {...fieldProps}
          ref={ref}
          id="file-upload"
          name="file-upload"
          className="sr-only"
          type="file"
          accept={accept ?? 'image/*'}
          onChange={handleFileChange}
        />

        {/* Icono */}
        <div className="space-y-1 text-center p-4 pointer-events-none">
          {isDragging ? (
            <span className='whitespace-nowrap'>¡Lo tengo!</span>
          ) : (
            <svg
              className="w-full h-full mx-auto text-muted-foreground"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Vista previa de la imagen */}
        {(previewUrl) && (
          <div className="absolute top-0 left-0 p-1 pointer-events-none">
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full aspect-square rounded object-cover bg-white"
            />
          </div>
        )}
      </label>

    </div>
  )
})

export default ImageUpload
