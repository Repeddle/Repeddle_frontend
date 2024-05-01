import { FormEvent, useCallback, useEffect, useState } from "react"
import Button from "../../components/ui/Button"
import InputWithLabel from "../../components/ui/InputWithLabel"
import useAuth from "../../hooks/useAuth"
import useToastNotification from "../../hooks/useToastNotification"

type Props = {
  token?: string | null
}

const ProfileForm = ({ token }: Props) => {
  const { registerUser, getUser, error, loading, getSuggestUsername } =
    useAuth()
  const { addNotification } = useToastNotification()

  const [formNumber, setFormNumber] = useState<1 | 2 | 3>(1)
  const [usernameSuggest, setUsernameSuggest] = useState<string[]>([])
  // when a user picks a suggested name no need to show suggest
  const [allowSuggest, setAllowSuggest] = useState(true)

  const [firstInput, setFirstInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [username, setUsername] = useState("")

  const [thirdInput, setThirdInput] = useState({
    password: "",
    confirmPassword: "",
  })

  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const firstValueChange = (key: keyof typeof firstInput, val: string) => {
    setFirstInput({ ...firstInput, [key]: val })
  }

  const thirdValueChange = (key: keyof typeof thirdInput, val: string) => {
    setThirdInput({ ...thirdInput, [key]: val })
  }

  const validateFirstForm = (val: keyof typeof firstInput) => {
    if (val === "firstName" && firstInput["firstName"].length < 3) {
      setFormError({
        ...formError,
        [val]: `First name must be at least 3 characters`,
      })
      return false
    }

    if (val === "lastName" && firstInput["lastName"].length < 3) {
      setFormError({
        ...formError,
        [val]: `Last name must be at least 3 characters`,
      })
      return false
    }

    setFormError({ ...formError, [val]: "" })
    return true
  }

  const validateUsername = () => {
    if (username.length < 3) {
      setFormError({
        ...formError,
        username: `Username must be at least 3 characters`,
      })
      return false
    }
    setFormError({ ...formError, username: `` })
    return true
  }

  const validateSecondForm = (val: keyof typeof thirdInput) => {
    if (val === "password" && thirdInput.password.length < 6) {
      setFormError({
        ...formError,
        password: "Password must be at least 6 characters",
      })
      return false
    }

    if (
      val === "confirmPassword" &&
      thirdInput.password !== thirdInput.confirmPassword
    ) {
      setFormError({
        ...formError,
        confirmPassword: "Confirm password must equal password",
      })
      return false
    }

    setFormError({ ...formError, [val]: "" })
    return true
  }

  const nextForm = () => {
    if (formNumber === 1) {
      // validate first form
      const valid = Object.keys(firstInput).every((input) =>
        validateFirstForm(input as keyof typeof firstInput)
      )
      if (valid) setFormNumber((formNumber + 1) as 2 | 1 | 3)

      return
    }

    if (formNumber === 2) {
      // validate first form
      const valid = validateUsername()
      if (valid) setFormNumber((formNumber + 1) as 2 | 1 | 3)

      return
    }
  }

  const previousForm = () => {
    if (formNumber !== 1) {
      setFormNumber((formNumber - 1) as 2 | 1 | 3)
    }
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    // validate password form
    const valid = Object.keys(thirdInput).every((input) =>
      validateSecondForm(input as keyof typeof thirdInput)
    )

    if (!valid) return

    if (!token) return addNotification("token not found")

    const res = await registerUser({
      ...firstInput,
      ...thirdInput,
      username,
      token,
    })
    if (res) {
      await getUser()
    }
    if (error) addNotification(error)
  }

  const fetchSuggest = useCallback(async () => {
    const response = await getSuggestUsername({
      firstName: firstInput.firstName,
      lastName: firstInput.lastName,
      otherText: username,
    })
    setUsernameSuggest(response)
  }, [firstInput.firstName, firstInput.lastName, getSuggestUsername, username])

  useEffect(() => {
    if (formNumber === 2 && allowSuggest) {
      fetchSuggest()
    }
  }, [allowSuggest, fetchSuggest, formNumber])

  return (
    <div className="flex h-full w-full justify-center items-center flex-col">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Finish creating an Account</h2>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          {formNumber === 1 && (
            <>
              <InputWithLabel
                label="First Name"
                id="first_name"
                placeholder="First name"
                value={firstInput.firstName}
                onChange={(val: string) => firstValueChange("firstName", val)}
                error={formError.firstName}
                onBlur={() => validateFirstForm("firstName")}
              />

              <InputWithLabel
                label="Last Name"
                id="last_name"
                placeholder="Last Name"
                value={firstInput.lastName}
                onChange={(val: string) => firstValueChange("lastName", val)}
                error={formError.lastName}
                onBlur={() => validateFirstForm("lastName")}
              />

              <InputWithLabel
                label="Phone Number"
                type="email"
                id="phone"
                placeholder="Phone Number"
                value={firstInput.phone}
                onChange={(val: string) => firstValueChange("phone", val)}
                error={formError.phone}
                onBlur={() => validateFirstForm("phone")}
              />
            </>
          )}

          {formNumber === 2 && (
            <InputWithLabel
              label="Username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(val: string) => {
                setUsername(val)
                !allowSuggest && setAllowSuggest(true)
              }}
              error={formError.username}
              // onBlur={validateUsername}
              suggest={allowSuggest ? usernameSuggest : undefined}
              onSuggestClick={(val: string) => {
                setUsername(val)
                setAllowSuggest(false)
              }}
            />
          )}

          {formNumber === 3 && (
            <>
              <InputWithLabel
                label="Password"
                id="password"
                type="password"
                value={thirdInput.password}
                onChange={(val: string) => thirdValueChange("password", val)}
                error={formError.password}
                onBlur={() => validateSecondForm("password")}
              />

              <InputWithLabel
                label="Confirm Password"
                type="password"
                id="confirm_password"
                value={thirdInput.confirmPassword}
                onChange={(val: string) =>
                  thirdValueChange("confirmPassword", val)
                }
                error={formError.confirmPassword}
                onBlur={() => validateSecondForm("confirmPassword")}
              />
            </>
          )}

          <div className="mt-5 flex justify-between">
            {formNumber !== 1 && (
              <Button
                text="Previous"
                type="button"
                onClick={() => previousForm()}
                disabled={loading}
              />
            )}

            {formNumber !== 3 && (
              <Button
                text={"Next"}
                type={"button"}
                onClick={nextForm}
                isLoading={loading}
                disabled={loading}
              />
            )}

            {formNumber === 3 && (
              <Button
                text="Register"
                type="submit"
                isLoading={loading}
                disabled={loading}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm
