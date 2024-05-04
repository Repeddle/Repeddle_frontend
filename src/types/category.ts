export type ICategory = {
  name: string
  image: string
  isCategory: boolean
  path: string
  subCategories: ISubCategory[]
  _id: string
  createdAt: string
  updatedAt: string
}

export type ISubCategory = {
  name: string
  items: Item[]
  isCategory: boolean
  path: string
  _id: string
}

export type Item = {
  name: string
  isCategory: boolean
  path: string
  _id: string
}

export type ICreateCategory = Omit<
  ICategory,
  "_id" | "createdAt" | "updatedAt"
> & {
  subCategories: (Omit<ISubCategory, "_id"> & {
    items: Omit<Item, "_id">[]
  })[]
}
