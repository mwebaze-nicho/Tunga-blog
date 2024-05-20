import jwt from "jsonwebtoken";
import { headers } from "next/headers";
export const verifyToken = async () => {
  const authorization = await headers().get("Authorization");
  const token = authorization.split(" ")[1];

  if (!authorization) {
    return rull;
  }

  if (!token) {
    return null
  }

  try {
   const user= await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return error;
      }

      return user;
    });
    return user
  } catch (error) {
    console.log(error);
  }
};
