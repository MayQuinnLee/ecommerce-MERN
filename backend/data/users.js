import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Sarah',
    email: 'sarah@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Lily',
    email: 'lily@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users 