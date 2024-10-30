// Original
export function createUser(name, email, password, phoneNumber, role = 'guest') {
  return db.users.create({
    id: crypto.randomUUID(),
    name,
    email,
    password: hashPassword(password),
    phoneNumber,
    role
  })
}

// Refactored
export function createUser({
  name,
  email,
  password,
  phoneNumber,
  role = 'guest'
}) {
  return db.users.create({
    id: crypto.randomUUID(),
    name,
    email,
    password: hashPassword(password),
    phoneNumber,
    role
  })
}