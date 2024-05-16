import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate, useParams } from "react-router-dom"
import { IUser } from "../../types/user"
import useToastNotification from "../../hooks/useToastNotification"
import UserLeftComp from "../../section/user/UserLeftComp"
import UserRightComp from "../../section/user/UserRightComp"
import useNewsletter from "../../hooks/useNewsletter"
import { compressImageUpload } from "../../utils/common"
import useUser from "../../hooks/useUser"

export type InputType = {
  zipcode: string
  state: string
  apartment: string
  street: string
  accountName: string
  accountNumber: string
  bankName: string
}

export type UserFormType = {
  firstName: string
  lastName: string
  email: string
  image: string
  about: string
  phone: string
  dob: string
  username: string
  confirmPassword: string
  password: string
  influencer: string
  badge: string
  active: string
}

const User = () => {
  const { id } = useParams()
  const { error, updateUser } = useAuth()
  const { getUserById } = useUser()
  const { addNotification } = useToastNotification()
  const {
    createNewsletter,
    deleteNewsletter,
    error: newsletterError,
  } = useNewsletter()

  const navigate = useNavigate()

  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return

      const user = await getUserById(id)

      if (user) setUser(user)
      else if (error) addNotification(error)
    }

    fetchUser()
  }, [id])

  const [rebundleStatus, setRebundleStatus] = useState(false)
  const [rebundleCount, setRebundleCount] = useState(0)
  const [loadingRebundle, setLoadingRebundle] = useState(false)
  const [rebundleError, setRebundleError] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState(
    user?.allowNewsletter ?? false
  )

  const [input, setInput] = useState<InputType>({
    accountName: "",
    accountNumber: "",
    apartment: "",
    bankName: "",
    state: "",
    street: "",
    zipcode: "",
  })
  const [errorInput, setErrorInput] = useState<InputType>({
    accountName: "",
    accountNumber: "",
    apartment: "",
    bankName: "",
    state: "",
    street: "",
    zipcode: "",
  })

  const [userForm, setUserForm] = useState<UserFormType>({
    about: "",
    active: "",
    badge: "",
    confirmPassword: "",
    dob: "",
    email: "",
    firstName: "",
    image: "",
    influencer: "",
    lastName: "",
    password: "",
    phone: "",
    username: "",
  })

  const [bundle, setBundle] = useState("")

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const balance = { balance: 500 }

  const handleOnChange = (text: string, input: keyof InputType) => {
    setInput((prevState) => ({ ...prevState, [input]: text }))
  }
  const handleError = (errorMessage: string, input: string) => {
    setErrorInput((prevState) => ({ ...prevState, [input]: errorMessage }))
  }

  const handleOnUserChange = (text: string, input: keyof UserFormType) => {
    setUserForm((prevState) => ({ ...prevState, [input]: text }))
  }

  const addressValidate = (e: MouseEvent) => {
    e.preventDefault()
    let valid = true
    if (!input.street) {
      handleError("Enter your street", "street")
      valid = false
    }

    if (!input.state) {
      handleError("Select your province", "province")
      valid = false
    }
    if (!input.zipcode) {
      handleError("Enter your zip code", "zipcode")
      valid = false
    }

    if (valid) {
      submitHandler(e)
    }
  }

  const accountValidate = (e: MouseEvent) => {
    e.preventDefault()
    let valid = true
    if (!input.accountNumber) {
      handleError("Enter a valid account number", "accountNumber")
      valid = false
    }
    if (!input.accountName) {
      handleError("Enter a valid account name", "accountName")
      valid = false
    }
    if (!input.bankName) {
      handleError("Select a valid bank", "bankName")
      valid = false
    }

    if (valid) {
      updateAccount()
    }
  }

  const updateAccount = async () => {}

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!id && userForm.password !== userForm.confirmPassword) {
      addNotification("Password do not match")
      return
    }
    if (userForm.username.length > 0) {
      const confirm = window.confirm(
        "Are you sure you want to edit your username? The next edit window  will be after 30 days"
      )
      if (!confirm) {
        return
      }
    }

    if (rebundleStatus && !bundle) {
      setRebundleError("Click activate to make Rebundle active ")
      return
    }

    setLoadingUpdate(true)

    const res = await updateUser({
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      dob: userForm.dob,
      phone: userForm.phone,
      about: userForm.about,
      address: {
        apartment: input.apartment,
        state: input.state,
        street: input.state,
        zipcode: +input.zipcode,
      },
      rebundle: { count: rebundleCount, status: rebundleStatus },
    })

    if (res) {
      addNotification("User updated")
      navigate(id ? "/dashboard/userlist" : `../../seller/${id}`)
    } else {
      addNotification(error ?? "failed to update user")
    }
  }

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const bodyFormData = new FormData()
    bodyFormData.append("file", file)
    setLoadingUpload(true)
    try {
      const compressImage = await compressImageUpload(file, 1024)

      handleOnUserChange(compressImage, "image")

      addNotification("Image Uploaded")
    } catch (err) {
      addNotification("Failed uploading image")
    }

    setLoadingUpload(false)
  }

  const handleRebundle = async (
    val: { status: boolean; count: number } | null
  ) => {
    console.log(val)
    setBundle("")
    setLoadingRebundle(true)
    setLoadingRebundle(false)
  }

  const handleNewsletter = async () => {
    if (newsletterStatus) {
      // TODO: ask if its userid
      const resp = await deleteNewsletter("")
      if (resp.success) {
        addNotification(resp.message ?? "Unsubscribed from newsletter")
        setNewsletterStatus(false)
      } else {
        addNotification(
          newsletterError ?? "failed to unsubscribe from newsletter"
        )
      }
    } else {
      const resp = await createNewsletter(user!.email)
      if (resp) {
        addNotification("Subscribed from newsletter")
        setNewsletterStatus(true)
      } else {
        addNotification(newsletterError ?? "failed to subscribe to newsletter")
      }
    }
  }

  return (
    <div className="flex-[4] p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
          Edit User
        </h1>
      </div>
      {user && (
        <div className="flex mt-5 flex-col gap-5 lg:flex-row lg:gap-0">
          <UserLeftComp
            user={user}
            errorInput={errorInput}
            handleError={handleError}
            handleOnChange={handleOnChange}
            input={input}
            balance={balance}
            accountValidate={accountValidate}
            addressValidate={addressValidate}
          />

          <UserRightComp
            user={user}
            handleOnUserChange={handleOnUserChange}
            loadingUpdate={loadingUpdate}
            loadingUpload={loadingUpload}
            submitHandler={submitHandler}
            userForm={userForm}
            bundle={bundle}
            handleNewsletter={handleNewsletter}
            handleRebundle={handleRebundle}
            newsletterStatus={newsletterStatus}
            rebundleStatus={rebundleStatus}
            setRebundleCount={setRebundleCount}
            setRebundleError={setRebundleError}
            setRebundleStatus={setRebundleStatus}
            uploadHandler={uploadHandler}
            id={id}
            loadingRebundle={loadingRebundle}
            rebundleError={rebundleError}
          />
        </div>
      )}
    </div>
  )
}

export default User
