// server/api/login.ts
import { defineEventHandler, readBody } from 'h3'
import { prisma } from '../db'  // Prisma client
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  // Get the request body
  const body = await readBody(event)
  const { email, password } = body

  // Validate input
  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required.'
    }
  }

  // Find user in the database by email
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password.'
    }
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return {
      success: false,
      message: 'Invalid email or password.'
    }
  }

  return {
    success: true,
    message: 'Login successful!',
    id: user.id
  }
})
