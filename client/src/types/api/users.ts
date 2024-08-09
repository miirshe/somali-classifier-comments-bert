// import { ObjectId } from 'mongoose';

interface Address {
  // Define the structure of the address object here
}

interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
}

interface IUser {
  name: string
  photo?: string
  phone?: string
  email: string
  address?: Address
  bio?: string
  fcmToken?: string
  password?: string
  role?: String
  passwordReset?: string
  status?: 'active' | 'inactive' | 'suspended' | 'locked'
  isOnline?: boolean
  registrationSource?: 'WEB' | 'ANDROID' | 'IOS' | 'UN_KNOWN'
  strategy?: 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'OTP'
  subscription?: String
  verificationStatus?: 'pending' | 'approved' | 'rejected'
  verificationDocuments?: string[]
  verificationNotes?: string
  favorites?: String[]
  notificationPreferences?: NotificationPreferences
  createdBy?: String
  updatedBy?: String
  createdAt?: Date
  updatedAt?: Date
}

interface IUserMethods {
  checkPassword(currentPassword: string, originalPassword: string): Promise<boolean>
  createAccessToken(user: IUser): string
  createRefreshToken(user: IUser): string
  verifyAccessToken(token: string): any
  verifyRefreshToken(token: string): any
}

// Combining the IUser interface with the Mongoose Document and IUserMethods

interface IUserDocument extends IUser, Document, IUserMethods {}

// Define the Mongoose model
// import mongoose from 'mongoose';

export type { IUserDocument, IUserMethods }
