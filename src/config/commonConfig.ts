

const commonConfig = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI ,
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: parseInt(process.env.SALT_ROUNDS || "10"),
}

export default commonConfig;