// React imports
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI imports
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

// Type for props
type Props = {
  setFileInput: (file: File | null) => void
  defaultImage?: string
  size?: number
}

const SingleImageUpload = ({ setFileInput, defaultImage = '', size = 100 }: Props) => {
  // States
  const [imgSrc, setImgSrc] = useState<string>(defaultImage)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handlers
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const { files } = event.target

    if (files?.length) {
      const file = files[0]
      setFileInput(file)
      reader.onload = () => {
        setImgSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputReset = () => {
    setFileInput(null)
    setImgSrc(defaultImage)
  }

  return (
    <div className='flex flex-col mt-1 '>
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`rounded-sm cursor-pointer flex justify-center items-center border-2 overflow-hidden`}
      >
        {imgSrc === '' ? (
          <IconButton onClick={() => inputRef.current?.click()}>
            <i className='tabler-plus text-[40px]' />
          </IconButton>
        ) : (
          <div className='relative'>
            <IconButton
              className='absolute bottom-[6px] right-0 bg-secondary rounded-sm'
              onClick={() => inputRef.current?.click()}
            >
              <i className='tabler-pencil text-white text-[16px]' />
            </IconButton>
            <img height={size} width={size} className='rounded object-cover' src={imgSrc} alt='Profile' />
          </div>
        )}
      </div>

      <input
        hidden
        type='file'
        ref={inputRef}
        accept='image/png, image/jpeg'
        onChange={handleFileChange}
        id='account-settings-upload-image'
      />
      {imgSrc && (
        <Typography className='text-error cursor-pointer' onClick={handleFileInputReset}>
          Reset Image
        </Typography>
      )}
    </div>
  )
}

export default SingleImageUpload
