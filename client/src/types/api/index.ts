interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
}

interface RoleAbility {
  action: string
  subject: string
}

interface IRole {
  _id: string
  name: string
  ability: RoleAbility[]
  status: string
  createdBy?: string
  updatedBy?: string
}

//plan type
interface IPlan {
  name: string
  price: number
  features: Array<{ [key: string]: string }>
  status?: string
  createdBy?: string
  updatedBy?: string
}

//user type
export interface IUser {
  notificationPreferences: NotificationPreferences
  _id: string
  name: string
  photo: string
  email: string
  role: IRole
  status: string
  isOnline: boolean
  registrationSource: string
  strategy: string
  currentPlan: IPlan | null
  verificationStatus: string
  verificationDocuments: any[] // Can be replaced with a specific type if known
  favorites: any[] // Can be replaced with a specific type if known
  bio: string
  createdAt: string
  updatedAt: string
  accessToken: string
  refreshToken: string
  action?: string
}

// Category Interface
export interface ICategory {
  _id: string
  name: string
  description?: string
  image?: string
  status?: string
  createdBy?: string
  updatedBy?: string
  createdAt?: Date
  updatedAt?: Date
}

// Amenity interface
export interface IAmenity {
  _id: string
  name: string
  type: string
  description: string
  image?: string
  status: string
  createdBy?: string | IUser
  updatedBy?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ILocation {
  address?: string
  city?: string
  state?: string
  latitude?: number | null
  longitude?: number | null
}

interface IPrice {
  amount?: number
  duration?: string
}

interface IBookingDuration {
  min?: number
  max?: number
}

interface IReviews {
  averageRating?: number
  totalReviews?: number
}

//listing interface
export interface IListing {
  amenities: Partial<IAmenity>[]
  beds: number
  bedrooms: number
  bathrooms: number
  bookingDuration: IBookingDuration
  cancellationPolicy: string[]
  confirmReservations: boolean
  createdAt: string
  createdBy: string
  datesUnavailable: string[]
  description: string
  highlights: string[]
  host: Partial<IUser>
  hostType: string
  isFeatured: boolean
  images: string[]
  location: ILocation
  maxGuests: number
  price: IPrice
  propertyType: Partial<ICategory>
  rentalType: string
  reviews: IReviews
  rules: string[]
  slug: string
  status: string
  title: string
  updatedAt: string
  updatedBy: string
  _id: string
  action?: string
}

// FQS Interface
export interface IFAQS {
  _id: string
  title: string
  topic: string
  description: string
  keywords: string
  status: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

//Banners interface
export interface IBanner {
  _id: string
  webImage: string
  mobileImage: string
  title: string
  body: string
  urlType?: 'internal' | 'external'
  url?: string
  buttonText?: string
  status?: 'active' | 'inactive'
  createdBy?: string
  createdAt: string
  updatedAt: string
}

//Review Interface
export interface IReview {
  _id: string
  user: Partial<IUser>
  listing: Partial<IListing>
  comment: string
  rating: number
  status?: 'active' | 'inactive'
  createdBy?: string
  createdAt: string
  updatedAt: string
}
