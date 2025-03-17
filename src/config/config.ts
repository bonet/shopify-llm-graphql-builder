import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    url: process.env.DATABASE_URL || "",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    url: process.env.DATABASE_URL || "",
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL || "",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
export default config;
