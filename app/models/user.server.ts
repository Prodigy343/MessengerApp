import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import testImg from 'app/avatar.png'

import { prisma } from '~/db.server'

export type { User } from '@prisma/client'

export async function getOnlineUsers () {
  return {
    onlineUsers: [
      {
        id: 'asdv1',
        name: 'Online User 1',
        avatar: testImg
      },
      {
        id: 'asdv2',
        name: 'Online User 2',
        avatar: testImg
      },
      {
        id: 'asdv3',
        name: 'Online User 3',
        avatar: testImg
      }
    ]
  }
}

export async function getUserById (id: User['id']) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getUserByEmail (email: User['email']) {
  return prisma.user.findUnique({ where: { email } })
}

export async function createUser (email: User['email'], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  })
}

export async function deleteUserByEmail (email: User['email']) {
  return prisma.user.delete({ where: { email } })
}

export async function verifyLogin (
  email: User['email'],
  password: Password['hash']
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true
    }
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  )

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
