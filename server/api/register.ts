// server/api/register.ts
import { defineEventHandler, readBody } from 'h3'
import { prisma } from '../db'  // Make sure the Prisma client is imported
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

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return {
      success: false,
      message: 'This email is already registered.'
    }
  }

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create the new user in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  return {
    success: true,
    message: 'Registration successful!',
    id: user.id // Returning the user ID after successful registration
  }
})
