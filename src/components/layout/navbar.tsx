"use client";
import { useState, useEffect } from "react";
import useFetchUser from "@/hooks/useFetchUser";
import axios from "axios";
import BurgerMenu from "./burgerMenu";
import { useIntl } from "react-intl";
import LanguageSwitcher from "../switchLang";
import ThemeSwitch from "../ThemeSwitch";
import UserMenu from "./userMenu";
import Cart from "../cart";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { formatMessage } = useIntl();
  const user = useFetchUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = async () => {
    try {
      await axios.post("/api/user/logout");
      alert(formatMessage({ id: "navbar.logout" }));
    } catch (err) {
      console.error("Error logging out", err);
      alert("An error occurred while logging out");
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header
        className={`p-4 h-16 fixed top-0 w-full bg-white dark:bg-black ${
          scrolling ? "border-b dark:border-b-black shadow-md" : ""
        } transition-all duration-300 z-50`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-2xl sm:text-3xl uppercase text-blue-500">
              xk<span className="text-yellow-400">shop</span>
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-4">
            <LanguageSwitcher />
            <ThemeSwitch />
            <div className="hidden sm:flex items-center gap-2 sm:gap-6">
              <UserMenu
                closeMenu={closeMenu}
                user={user}
                setOpen={setOpen}
                onSubmit={onSubmit}
              />
            </div>
            <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-4 z-10 w-full bg-white dark:bg-gray-700 p-4">
          <div className="flex flex-col gap-4">
            <UserMenu
              closeMenu={closeMenu}
              user={user}
              setOpen={setOpen}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}

      {open && <Cart setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
