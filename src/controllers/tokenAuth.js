import jwt from "jsonwebtoken";
import { headers } from "next/headers";
export const verifyToken = async () => {
  const authorization = await headers().get("Authorization");
  const token = authorization.split(" ")[1];

  if (!authorization) {
    return rull;
  }

  if (!token) {
    return null;
  }

  try {
    const user = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return error;
        }

        return user;
      }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const passwordResetToken = async (userInfo) => {
  if (!userInfo) return null;

  try {
    const resetToken = await jwt.sign(
      { user: userInfo },
      process.env.PASSWORD_RESET_SECRET,
      { expiresIn: "1h" }
    );
    return resetToken;
  } catch (error) {
    console.log(error);
  }
};
export const verifyResetToken = async () => {
  const authorization = await headers().get("Authorization");
  const token = authorization.split(" ")[1];

  if (!authorization) {
    return rull;
  }

  if (!token) {
    return null;
  }

  try {
    const user = await jwt.verify(
      token,
      process.env.PASSWORD_RESET_SECRET,
      (error, user) => {
        if (error) {
          return error;
        }

        return user;
      }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};
