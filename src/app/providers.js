"use client";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import fetcher from "@/services/fetcher";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export function ChackraProviders({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export function SwrProviders({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 3000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
