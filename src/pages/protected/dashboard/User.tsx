import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { useNavigate, useParams } from "react-router-dom"
import { IAddress, IUser } from "../../../types/user"
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
import useWallet from "../../../hooks/useWallet"

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
  influencer: boolean
  badge: boolean
  active: boolean
}

const User = () => {
  const { id } = useParams()
  const { error, updateUser, user: usersData } = useAuth()
  const { getUserById, error: getUserError, updateUserById } = useUser()
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

      if (user && typeof user !== "string") {
        setUser(user)
        setRebundleStatus(user.rebundle?.status || false)
        setBundle(user.rebundle?.status || false)
        userForm.active = user.active
        userForm.influencer = user.influencer ?? false
        userForm.badge = user.badge ?? false
        // eslint-disable-next-line no-constant-condition
      } else if (getUserError || user || "Failed to get user") {
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
    active: true,
    badge: false,
    confirmPassword: "",
    dob: "",
    email: "",
    firstName: "",
    image: "",
    influencer: false,
    lastName: "",
    password: "",
    phone: "",
    username: "",
  })

  const [bundle, setBundle] = useState(false)

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [showModelAddress, setShowModelAddress] = useState(false)
  const { wallet, fetchWallet } = useWallet()

  useEffect(() => {
    fetchWallet()
  }, [])

  const handleOnChange = (text: string, input: keyof InputType) => {
    setInput((prevState) => ({ ...prevState, [input]: text }))
  }
  const handleError = (errorMessage: string, input: string) => {
    setErrorInput((prevState) => ({ ...prevState, [input]: errorMessage }))
  }

  const handleOnUserChange = (
    text: string | boolean,
    input: keyof UserFormType
  ) => {
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

    const data = {
      accountName: input.accountName,
      accountNumber: +input.accountNumber,
      bankName: input.bankName,
    }

    if (usersData?.role === "Admin" && !id) return

    const res =
      usersData?.role === "Admin"
        ? await updateUserById(id!, data)
        : await updateUser(data)
    if (res && typeof res !== "string") {
      addNotification("Account updated")
      setShowModel(false)
      setUser(res)
    } else {
      addNotification(
        error || res || "Failed to update account",
        undefined,
        true
      )
    }
    setLoadingUpdate(false)
    setShowModel(false)
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!id && userForm.password.length) {
      if (userForm.password.length < 6) {
        addNotification("Password must be at least 6 characters")
        return
      }
      if (userForm.password.search(/[a-z]/i) < 0) {
        addNotification(
          "Password must contain at least 1 lowercase alphabetical character"
        )
        return
      }
      if (userForm.password.search(/[A-Z]/) < 0) {
        addNotification(
          "Password must contain at least 1 uppercase alphabetical character"
        )
        return
      }
      if (userForm.password.search(/[0-9]/) < 0) {
        addNotification("Password must contain at least 1 digit")
        return
      }

      if (userForm.password !== userForm.confirmPassword) {
        addNotification("Password do not match")

        return
      }
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

    const data: Partial<IUser & { password?: string }> = {}

    if (userForm.firstName) {
      data.firstName = userForm.firstName
    }
    if (userForm.lastName) {
      data.lastName = userForm.lastName
    }
    if (userForm.dob) {
      data.dob = userForm.dob
    }
    if (userForm.phone) {
      data.phone = userForm.phone
    }
    if (userForm.about) {
      data.about = userForm.about
    }
    if (userForm.email) {
      data.email = userForm.email
    }
    if (userForm.image) {
      data.image = userForm.image
    }

    if (userForm.password) {
      data["password"] = userForm.password
    }

    if (userForm.username) {
      data["username"] = userForm.username
    }

    if (usersData?.role === "Admin") {
      data["active"] = userForm.active
      data["badge"] = userForm.badge
      data["influencer"] = true
    }

    const address: Partial<IAddress> = {}

    if (input.apartment) {
      address.apartment = input.apartment
    }
    if (input.state) {
      address.state = input.state
    }
    if (input.street) {
      address.street = input.street
    }
    if (input.zipcode) {
      address.zipcode = parseInt(input.zipcode)
    }

    if (Object.keys(address).length > 0) data.address = address

    if (usersData?.role === "Admin" && !id) return

    const res =
      usersData?.role === "Admin"
        ? await updateUserById(id!, data)
        : await updateUser(data)

    if (res && typeof res !== "string") {
      addNotification("User updated")
      setUser(res)
      if (userForm.username && usersData?.role !== "Admin")
        navigate(`/seller/${res.username}`)
    } else {
      addNotification(error || res || "failed to update user")
    }

    setLoadingUpdate(false)
    setShowModelAddress(false)
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
    setLoadingRebundle(true)

    let data: Partial<IUser> = {}
    if (val) {
      data = {
        rebundle: val,
      }
    } else {
      data = {
        rebundle: { count: rebundleCount, status: true },
      }
    }

    if (usersData?.role === "Admin" && !id) return

    const res =
      usersData?.role === "Admin"
        ? await updateUserById(id!, data)
        : await updateUser(data)

    if (res && typeof res !== "string") {
      if (data.rebundle?.status) {
        addNotification("Rebundle activated")
      } else {
        addNotification("Rebundle deactivated")
      }
      setUser(res)
      setRebundleStatus(data.rebundle?.status || false)
      setBundle(data.rebundle?.status || false)
    } else {
      addNotification(error || res || "failed to update rebundle")
    }

    setLoadingRebundle(false)
  }

  const handleNewsletter = async () => {
    if (newsletterStatus) {
      const resp = await unsubscribeNewsletter()
      if (resp.success) {
        addNotification(
          resp.message ? resp.message : "Unsubscribed Successfully"
        )
        setNewsletterStatus(false)
        if (usersData?.role === "Admin" && !id) return

        const res =
          usersData?.role === "Admin"
            ? await updateUserById(id!, { allowNewsletter: false })
            : await updateUser({ allowNewsletter: false })

        if (res && typeof res !== "string") {
          setUser(res)
        }
      } else {
        addNotification(
          newsletterError ? newsletterError : "Failed to unsubscribe",
          undefined,
          true
        )
      }
    } else {
      const resp = await createNewsletter(user!.email)
      if (usersData?.role === "Admin" && !id) return

      const res =
        usersData?.role === "Admin"
          ? await updateUserById(id!, { allowNewsletter: true })
          : await updateUser({ allowNewsletter: true })

      if (res && typeof res !== "string") {
        setUser(res)
      }
      if (resp) {
        addNotification("Subscribed Successfully")
        setNewsletterStatus(true)
      } else {
        addNotification(
          newsletterError ? newsletterError : "Failed to subscribe"
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
            balance={wallet}
            accountValidate={accountValidate}
            addressValidate={addressValidate}
            loadingUpdate={loadingUpdate}
            setShowModel={setShowModel}
            setShowModelAddress={setShowModelAddress}
            showModel={showModel}
            showModelAddress={showModelAddress}
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
