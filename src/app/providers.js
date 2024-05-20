"use client";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export function Providers({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
