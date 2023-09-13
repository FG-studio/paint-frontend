export type TextInputProps = {
  value?: string
  placeholder?: string
  onChange?: (data: string) => void
  className?: string
  disabled?: boolean
}

const TextInput = ({
  value,
  placeholder,
  onChange,
  className,
  disabled,
}: TextInputProps) => {
  return (
    <div
      className={`${
        className ? className : ''
      } flex items-center justify-center`}
    >
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.currentTarget.value)
          }
        }}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-500 w-full`}
        disabled={disabled}
      />
    </div>
  )
}

export default TextInput
