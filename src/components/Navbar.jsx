"use client";
import {
  Link,
  Flex,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session } = useSession();

  const handleMenuItemClick = () => {
    if (isOpen) {
      onToggle();
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="end"
      wrap="wrap"
      padding="1rem"
      className=" text-gray-800"
    >
      <span className="flex justify-between w-full items-center">
        <h1 className="text-xl">THE DEV DIGIST 🧑🏽‍💻</h1>
        <span className="hidden md:flex gap-8 items-center">
          <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link
            as={NextLink}
            href="/post/create"
            _hover={{ textDecoration: "none" }}
          >
            Create Post
          </Link>

          {!session ? (
            <Link
              as={NextLink}
              href="/users/login"
              _hover={{ textDecoration: "none" }}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                as={NextLink}
                href="/post/my-posts"
                _hover={{ textDecoration: "none" }}
              >
                My Posts
              </Link>
              <Link
                as={NextLink}
                href="/"
                _hover={{ textDecoration: "none" }}
                onClick={() => signOut()}
              >
                Logout
              </Link>
            </>
          )}
        </span>

        {/* for small screens */}
        <span className="md:hidden">
          <Menu isOpen={isOpen}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={
                isOpen ? (
                  <CloseIcon name="menu" size="24px" />
                ) : (
                  <HamburgerIcon name="menu" size="24px" />
                )
              }
              variant="outline"
              onClick={onToggle}
            />
            <MenuList>
              <MenuItem as={NextLink} href="/" onClick={handleMenuItemClick}>
                Home
              </MenuItem>
              <MenuItem
                as={NextLink}
                href="/post/create"
                onClick={handleMenuItemClick}
              >
                Create Post
              </MenuItem>

              {!session ? (
                <MenuItem
                  as={NextLink}
                  href="/users/login"
                  _hover={{ textDecoration: "none" }}
                  onClick={handleMenuItemClick}
                >
                  Login
                </MenuItem>
              ) : (
                <>
                  <MenuItem
                    as={NextLink}
                    href="/post/my-posts"
                    onClick={handleMenuItemClick}
                  >
                    My Posts
                  </MenuItem>
                  <MenuItem
                    as={NextLink}
                    href="/"
                    onClick={() => {
                      handleMenuItemClick();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </span>
      </span>
    </Flex>
  );
}

export default Navbar;
