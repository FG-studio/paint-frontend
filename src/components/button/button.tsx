import { ReactNode, useCallback, useState } from 'react'

export const buttonVariants = [
  'primary',
  'secondary',
  'warm',
  'success',
  'danger',
  'info',
  'light',
  'dark',
  'link',
]

export type ButtonProps = {
  onClick?: () => void
  className?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'warm'
    | 'success'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
  children: ReactNode
  disabled?: boolean
}

const variantStyleFunc = (
  variant?:
    | 'primary'
    | 'secondary'
    | 'warm'
    | 'success'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link',
) => {
  switch (variant) {
    case 'primary':
      return 'text-white bg-blue-600 border border-blue-600'
    case 'secondary':
      return 'text-white bg-gray-700 border border-gray-700'
    case 'success':
      return 'text-white bg-green-600 border border-green-600'
    case 'danger':
      return 'text-white bg-red-700 border border-red-700'
    case 'warm':
      return 'text-white bg-yellow-600 border border-yellow-600'
    case 'info':
      return 'text-white bg-cyan-500 border border-cyan-500'
    case 'light':
      return 'text-black bg-gray-200 border border-gray-200'
    case 'dark':
      return 'text-white bg-black border border-black'
    case 'link':
      return 'text-blue-600 underline'
    default:
      return ''
  }
}

const Button = (props: ButtonProps) => {
  const { children, className, variant, onClick, disabled, ...others } = props
  const variantStyle = useCallback(() => variantStyleFunc(variant), [variant])
  const [isLoading, setLoading] = useState(false)
  const handleOnClick = async () => {
    if (disabled) return
    if (!onClick) return
    if (isLoading) return
    try {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await onClick()
    } catch (e) {
      //console.error('error when clicked', e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div
        className={`${
          className ? className : ''
        } hover:opacity-75 px-4 py-2 rounded-md cursor-pointer ${variantStyle()}`}
        {...others}
        onClick={handleOnClick}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className=" animate-spin rounded-full h-4 w-4 border-t-2 mr-2"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </>
  )
}

export default Button
