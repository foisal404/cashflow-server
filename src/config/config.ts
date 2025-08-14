import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoURI: string;
}

const config: Config = {
  mongoURI: process.env.MONGO_URI || "",
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
