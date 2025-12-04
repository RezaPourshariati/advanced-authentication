import type { Request } from 'express'
import type { Document } from 'mongoose'

// User Document Interface
export interface IUser extends Document {
  name: string
  email: string
  password: string
  photo?: string
  phone?: string
  bio?: string
  role: 'subscriber' | 'author' | 'admin' | 'suspended'
  isVerified: boolean
  userAgent?: string[]
  createdAt?: Date
  updatedAt?: Date
}

// Token Document Interface
export interface IToken extends Document {
  userId: string
  vToken?: string
  rToken?: string
  lToken?: string
  createdAt: Date
  updatedAt: Date
}

// Extended Request with User
export interface AuthRequest extends Request {
  user?: IUser
}

// Login/Register Data
export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface UpdateUserData {
  name?: string
  phone?: string
  bio?: string
  photo?: string
}

export interface PasswordChangeData {
  oldPassword: string
  password: string
}

// Email Options
export interface EmailOptions {
  subject: string
  send_to: string
  sent_from: string
  reply_to: string
  template: string
  name: string
  link: string
}

// JWT Payload
export interface JWTPayload {
  id: string
  iat?: number
  exp?: number
}

// Google Auth Response
export interface GoogleAuthResponse {
  email: string
  name: string
  picture: string
  email_verified: boolean
}

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Error Response
export interface ErrorResponse {
  message: string
  stack?: string
}
