import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'

export function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

export function generateRefreshToken({ refreshToken, userId }) {
  return jwt.sign({ refreshToken, userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// Hash Token ---> hashing tokens before it saves to the database.
export function hashToken(token) {
  return crypto.createHash('sha256').update(token.toString()).digest('hex')
}
