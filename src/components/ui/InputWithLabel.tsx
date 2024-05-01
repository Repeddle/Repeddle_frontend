import { InputHTMLAttributes, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

type Props = {
  label: string
  value?: string
  onChange?: (val: string) => void
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  error?: string
  onBlur?: () => void
  suggest?: string[]
  onSuggestClick?: (val: string) => void
}

const InputWithLabel = ({
  label,
  id,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
  required,
  error,
  onBlur,
  onSuggestClick,
  suggest = [],
}: Props) => {
  const [switchType, setSwitchType] = useState(type)

  const toggleType = () => {
    if (type === "password") {
      if (switchType === "text") {
        setSwitchType("password")
      }
      if (switchType === "password") {
        setSwitchType("text")
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base">
        {label}
      </label>
      <div className="w-full relative">
        <input
          type={switchType}
          id={id}
          name={name}
          className={`w-full px-4 h-12 py-2 border-black dark:bg-black-color bg-white-color text-black-color
        dark:text-white-color bg-opacity-20 dark:border-white dark:focus:border-orange-color rounded-lg focus:outline-none border focus:border-orange-color`}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => onChange && onChange(e.target.value)}
          onBlur={onBlur}
        />

        {type === "password" &&
          (switchType === "password" ? (
            <FaEye
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg"
              onClick={toggleType}
            />
          ) : (
            <FaEyeSlash
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg"
              onClick={toggleType}
            />
          ))}
      </div>
      {error && <span className="text-sm text-[red]">{error}</span>}

      {suggest.length > 0 && (
        <div className="flex gap-2 text-sm">
          <span>Suggestions:</span>
          {suggest.map((sugg) => (
            <span
              className="cursor-pointer hover:text-orange-color hover:underline"
              key={sugg}
              onClick={() => onSuggestClick?.(sugg)}
            >
              {sugg}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputWithLabel
