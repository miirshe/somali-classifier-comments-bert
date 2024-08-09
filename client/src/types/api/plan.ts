interface IPlan {
  name: string
  slug?: string
  description?: string
  duration: number
  durationType: 'days' | 'weeks' | 'months' | 'years'
  price: number
  salePrice?: number
  salePriceDate?: {
    from?: Date
    to?: Date
  }
  features: Array<{
    name: string
    value: number
    description?: string
  }>
  hasTrial: boolean
  trialDuration?: {
    duration: number
    durationType: 'days' | 'weeks' | 'months' | 'years'
  }
  createdBy?: string
  updatedBy?: string
  createdAt?: Date
  updatedAt?: Date
}

export default IPlan
