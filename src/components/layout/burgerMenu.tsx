"use client";
import { FaBars, FaTimes } from "react-icons/fa";

interface BurgerMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ menuOpen, setMenuOpen }) => {
  return (
    <button
      className="sm:hidden dark:text-white ms-2 text-blue-500"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    </button>
  );
};

export default BurgerMenu;
