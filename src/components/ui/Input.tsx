import { InputHTMLAttributes } from "react"

type Props = {
  label?: string
  value?: string
  onChange?: (val: string) => void
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
  id?: string
  name?: "string"
}

const Input = ({ label, type = "text", onChange, value, id, name }: Props) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-4" htmlFor={id}>
          {label}
        </label>
      )}
      <div>
        <div className="flex items-center justify-center border w-full px-2.5 py-0 rounded-[0.2rem]">
          <input
            type={type}
            value={value}
            id={id}
            name={name}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="block w-full text-base font-normal rounded-md leading-normal text-[color:var(--bs-body-color)] appearance-none bg-[color:var(--bs-body-bg)] bg-clip-padding border-[length:var(--bs-border-width)] border-[color:var(--bs-border-color)]  px-3 py-1.5 border-solid"
          />
        </div>
      </div>
    </div>
  )
}

export default Input
