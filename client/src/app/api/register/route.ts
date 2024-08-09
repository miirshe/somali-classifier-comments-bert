import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const { name, email, password } = await request.json()

  console.log(name, email, password)

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return new NextResponse('User already exists', {
      status: 409 // Conflict
    })
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create a new user
  try {
    await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email
      }
    })
  } catch (err) {
    console.error('Error creating user:', err)
    return new NextResponse(err.message, {
      status: 500
    })
  }

  return new NextResponse('User has been created', {
    status: 201
  })
}
