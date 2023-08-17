import bcrypt from "bcryptjs";  // bcryptjs is a library to hash passwords

const users = [
  {
    name: "Admin User",
    email: "adminuser@email.com",
    password: bcrypt.hashSync("123456", 10),  // 10 is the complexity of the hash
    isAdmin: true,
  },
  {
    name: "User One",
    email: "userone@email.com",
    password: bcrypt.hashSync("123456", 10),  // 10 is the complexity of the hash
    isAdmin: false,
  },
  {
    name: "User Two",
    email: "usertwo@email.com",
    password: bcrypt.hashSync("123456", 10),  // 10 is the complexity of the hash
    isAdmin: false,
  }
]

export default users;