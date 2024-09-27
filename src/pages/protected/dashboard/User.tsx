import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { useNavigate, useParams } from "react-router-dom"
import { IUser } from "../../../types/user"
import useToastNotification from "../../../hooks/useToastNotification"
import UserLeftComp from "../../../section/user/UserLeftComp"
import UserRightComp from "../../../section/user/UserRightComp"
import useNewsletter from "../../../hooks/useNewsletter"
import { compressImageUpload } from "../../../utils/common"
import useUser from "../../../hooks/useUser"
import LoadingLogoModal from "../../../components/ui/loadin/LoadingLogoModal"
import MessageBox from "../../../components/MessageBox"
import { getUserService } from "../../../services/auth"
import { getBackendErrorMessage } from "../../../utils/error"

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
  const { error, updateUser, user: usersData } = useAuth()
  const { getUserById, error: getUserError } = useUser()
  const { addNotification } = useToastNotification()
  const {
    createNewsletter,
    unsubscribeNewsletter,
    error: newsletterError,
  } = useNewsletter()

  const navigate = useNavigate()

  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      let user: string | IUser | null
      setLoading(true)
      setErrors("")
      if (usersData?.role === "Admin") {
        if (!id) {
          setErrors("user id not found")
          return addNotification("user id not found")
        }
        user = await getUserById(id)
      } else {
        try {
          user = await getUserService()
        } catch (error) {
          user = getBackendErrorMessage(error)
        }
      }

      if (user && typeof user !== "string") setUser(user)
      else if (getUserError || user || "Failed to get user") {
        addNotification(getUserError || user || "Failed to get user")
        setErrors(getUserError || user || "Failed to get user")
      }
      setLoading(false)
    }

    fetchUser()
  }, [id])

  const [rebundleStatus, setRebundleStatus] = useState(false)
  const [rebundleCount, setRebundleCount] = useState(0)
  const [loadingRebundle, setLoadingRebundle] = useState(false)
  const [rebundleError, setRebundleError] = useState("")
  const [errors, setErrors] = useState("")
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

  const addressValidate = (e: FormEvent) => {
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

  const accountValidate = (e: FormEvent) => {
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

  const updateAccount = async () => {
    setLoadingUpdate(true)

    const res = await updateUser({
      accountName: input.accountName,
      accountNumber: +input.accountNumber,
      bankName: input.bankName,
    })
    if (res) {
      addNotification("Account updated")
      navigate("/newproduct")
    } else {
      addNotification(error || "Failed to update account")
    }
    setLoadingUpdate(false)
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!id && userForm.password !== userForm.confirmPassword) {
      addNotification("Password do not match")
      return
    }
    if (userForm.username.length > 0 && userForm.username !== user?.username) {
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
      navigate(-1)
    } else {
      addNotification(error ? error : "failed to update user")
    }
  }

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const bodyFormData = new FormData()
    bodyFormData.append("file", file)
    setLoadingUpload(true)
    try {
      const compressImage = await compressImageUpload(file, 1024, user?.image)

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
      const resp = await unsubscribeNewsletter()
      if (resp.success) {
        addNotification(
          resp.message ? resp.message : "Unsubscribed from newsletter"
        )
        setNewsletterStatus(false)
        await updateUser({ allowNewsletter: true })
      } else {
        addNotification(
          newsletterError
            ? newsletterError
            : "Failed to unsubscribe from newsletter"
        )
      }
    } else {
      const resp = await createNewsletter(user!.email)
      await updateUser({ allowNewsletter: false })
      if (resp) {
        addNotification("Subscribed to newsletter")
        setNewsletterStatus(true)
      } else {
        addNotification(
          newsletterError
            ? newsletterError
            : "Failed to subscribe to newsletter"
        )
      }
    }
  }

  return (
    <div className="flex-[4]">
      <div className="flex items-center justify-between">
        <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
          Edit User
        </h1>
      </div>
      {loading && <LoadingLogoModal />}
      {errors && <MessageBox>{errors}</MessageBox>}
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
            loadingUpdate={loadingUpdate}
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
