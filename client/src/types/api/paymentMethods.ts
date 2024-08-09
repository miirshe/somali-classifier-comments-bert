interface IPaymentMethod {
  _id?: string
  name: string
  description?: string
  parameters?: Record<string, any>
  fields?: any[]
  status?: 'active' | 'inactive'
  createdBy?: string
  updatedBy?: string
  createdAt?: string
  updatedAt?: string
}

export default IPaymentMethod
