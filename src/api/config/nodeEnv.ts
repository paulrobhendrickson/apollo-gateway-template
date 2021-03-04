import dotenv from "dotenv";
dotenv.config();

export enum NODE_ENV {
  DEV = "development",
  STAGE = "stage",
  PROD = "production",
}

//get current node environment
export const currentEnv = process.env.NODE_ENV;
