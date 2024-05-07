export type IContactMessage = {
  _id: string
  name: string
  email: string
  category: string
  subject: string
  message: string
  file?: string
  assignTo?: string
  createdAt: string
  updatedAt: string
}

export type INewsletter = {
  _id: string
  emailType: string
  email: string
  isDeleted: boolean
  url: string
  sent: {
    emailName: string
    _id: string
    updatedAt: string
    createdAt: string
  }[]
  createdAt: string
  updatedAt: string
}

export type IEmailList = {
  name: string
  subject: string
  template: string
}

export type IBrand = {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  isAdded: boolean
}
