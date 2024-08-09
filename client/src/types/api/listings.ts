interface ILocation {
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
}

interface IPrice {
  amount: number
  duration: 'night' | 'day' | 'week' | 'month' | 'year'
}

interface IBookingDuration {
  min: number
  max: number
}

interface IReviews {
  averageRating: number
  numberOfReviews: number
}

interface IListing {
  host: String // Reference to the User model

  // Property Information
  title: string
  description: string
  highlights?: string[]
  propertyType: String // Reference to the Category model

  // Location Information
  location: ILocation

  // Pricing Information
  price: IPrice
  discounts?: string[]

  // Availability
  bookingDuration: IBookingDuration
  datesAvailable?: Date[]

  // Reservation Information
  confirmReservations?: boolean
  rentalType: 'entire place' | 'private room' | 'shared room'

  // Property Details
  maxGuests: number
  bedrooms: number
  bathrooms: number
  amenities?: [] // Reference to the Amenity model

  // Images
  images: string[]

  isFeatured: boolean

  // Host Type
  hostType: 'private individual' | 'business'

  // Additional Fields
  rules?: string[]
  cancellationPolicy?: string[]
  reviews: IReviews

  // Metadata
  createdBy?: String // Reference to the User model
  updatedBy?: String // Reference to the User model
}

export default IListing
