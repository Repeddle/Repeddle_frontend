export type IMessage = {
  _id: string
  name: string
  email: string
  category: string
  subject: string
  message: string
  file?: string
  assignTo?: string
}
