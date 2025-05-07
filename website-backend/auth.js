const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
const register = async (req, res) => {
  console.log("Register request received");
  const { email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Creating user in database");
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  res.status(201).json({
    message: "User registered",
    user: { id: user.id, email: user.email },
  });
};

// Login
const login = async (req, res) => {
  console.log("Login request received");
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({ message: "Login successful", token });
};

module.exports = { register, login };
