import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn } from "@/utils/motion";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./hooks/CartContext";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import UserIcon from "./icons/UserIcon";
import AuthButton from "./AuthButton";
import { useImage } from "./hooks/useImage";

export default function Header({ categories }) {
  const inactiveLink =
    "hover:text-primary hover:scale-105 hover:decoration-primary decoration-secondary underline underline-offset-4 transition-all delay-150 duration-300";
  const activeLink = inactiveLink.replace(
    "decoration-secondary",
    "decoration-white"
  );

  const [navOpen, setNavOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userButton, setUserButton] = useState(false);

  const { cartProducts } = useContext(CartContext);

  const pathname = usePathname();
  const session = useSession();
  const { userImage, loading } = useImage();

  console.log(session);

  return (
    <>
      <header className="fixed top-0 w-full hidden sm:flex justify-around h-[80px] items-center bg-secondary text-white z-[2]">
        <Link id="ecommerce" className={inactiveLink} href={"/"}>
          Ecommerce
        </Link>
        <nav className="flex gap-10">
          <Link
            onMouseEnter={() => setIsHovered(false)}
            className={`${pathname === "/" ? activeLink : inactiveLink}`}
            href={"/"}
          >
            Home
          </Link>
          <Link
            onMouseEnter={() => setIsHovered(false)}
            className={`${
              pathname.includes("/products") ? activeLink : inactiveLink
            }`}
            href={"/products"}
          >
            All Products
          </Link>
          <div>
            <div
              onMouseEnter={() => setIsHovered(true)}
              className={`${inactiveLink} relative cursor-pointer`}
            >
              Categories
            </div>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                onMouseLeave={() => setIsHovered(false)}
                variants={slideIn("down", "tween", 0.1, 0.3, true)}
                initial="hidden"
                whileInView="show"
                exit="exit"
                className="flex justify-center items-center absolute bg-secondary w-screen top-[80px] left-0 z-[-1] border-t border-white"
              >
                <div className="w-[70%] flex justify-center p-5 gap-y-5 gap-x-[150px] flex-wrap">
                  {categories?.map((category) => (
                    <Link
                      key={{}}
                      className={
                        pathname.includes("/categories/" + category._id)
                          ? activeLink
                          : inactiveLink
                      }
                      href={"/categories/" + category._id}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        <nav className="flex gap-10 items-center">
          <div>{session?.data?.user.email}</div>
          {!loading && session?.status !== "loading" && (
            <>
              {session.status === "authenticated" ? (
                <Link
                  href={"/account/profile"}
                  className={`transition-all delay-150 duration-300 hover:text-primary ${
                    pathname.includes("account") ? "text-primary" : "text-white"
                  }`}
                >
                  {userImage ? (
                    <div
                      className={`size-9 rounded-full flex justify-center items-center border-2 ${
                        pathname.includes("account")
                          ? "border-primary"
                          : "border-white"
                      }`}
                    >
                      <img
                        className="w-full h-full object-cover rounded-full cursor-pointer"
                        src={userImage}
                        alt="User Image"
                      />
                    </div>
                  ) : (
                    <UserIcon className="size-7" />
                  )}
                </Link>
              ) : (
                <div className="relative flex justify-center">
                  <div
                    onClick={() => setUserButton((prev) => !prev)}
                    className="cursor-pointer"
                  >
                    <UserIcon className="size-7" />
                  </div>
                  <AnimatePresence>
                    {userButton && (
                      <motion.div
                        variants={slideIn("down", "tween", 0.1, 0.3, true)}
                        whileInView="show"
                        initial="hidden"
                        exit="exit"
                        className="absolute text-black shadow-2xl p-4 flex top-10 bg-gray-100 rounded-lg border-2 border-black"
                      >
                        <AuthButton />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
          <Link href={"/cart"} className="group">
            <div className="flex items-center h-[60px] relative transition delay-150 duration-300 group-hover:text-primary">
              <CartIcon className="size-7" />
              <div className="absolute top-2 left-4 bg-secondary text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
                {cartProducts.length}
              </div>
            </div>
          </Link>
        </nav>
      </header>
      <header
        className={`w-full sm:hidden flex justify-around h-[70px] items-center transition delay-50 duration-500 text-white ${
          navOpen ? "bg-black" : "bg-secondary"
        }`}
      >
        <div onClick={() => setNavOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Link href={"/"}>Ecommerce</Link>
        <Link href={"/cart"} className="group">
          <div className="flex items-center h-[60px] relative transition delay-150 duration-300 group-hover:text-primary">
            <CartIcon className="size-7" />
            <div className="absolute top-2 left-4 bg-secondary text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
              {cartProducts.length}
            </div>
          </div>
        </Link>
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              variants={slideIn("left", "tween", 0, 0.5, false)}
              initial="hidden"
              whileInView="show"
              exit="exit"
              className="absolute top-0 left-0 h-screen bg-secondary w-[60%] pl-[60px]"
            >
              <div
                onClick={() => setNavOpen(false)}
                className="absolute top-5 right-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-between h-[40%]">
                <nav className="flex flex-col gap-10 mt-[100px] justify-center">
                  <Link className={inactiveLink} href={"/"}>
                    Home
                  </Link>
                  <Link className={inactiveLink} href={"/"}>
                    All Products
                  </Link>
                  <Link className={inactiveLink} href={"/"}>
                    Categories
                  </Link>
                </nav>
                <nav className="flex flex-col gap-10 justify-center">
                  <Link href={"/account"} className="flex gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Account
                  </Link>
                </nav>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
