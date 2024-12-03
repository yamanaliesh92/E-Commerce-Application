"use client";
import Link from "next/link";
import { FaShoppingCart, FaEdit, FaPlus } from "react-icons/fa";
import { useIntl } from "react-intl";

interface UserMenuProps {
  user: {
    id: number;
    email: string;
    username: string;
    createdAt: Date;
  } | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  closeMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  closeMenu,
  setOpen,
  onSubmit,
}) => {
  const { formatMessage } = useIntl();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {!user ? (
        <>
          <Link
            className="bg-transparent rounded-md border dark:text-primary text-blue-500 border-yellow-400 ps-4 pe-4 py-2 transition duration-300 hover:bg-yellow-400 hover:text-black"
            href="/sign-up"
            onClick={closeMenu}
          >
            {formatMessage({ id: "navbar.signUp" })}
          </Link>
          <Link
            className="rounded-md text-white bg-yellow-400 dark:bg-white dark:text-primary ps-4 pe-4 py-2 transition duration-300 hover:bg-yellow-500 hover:text-black"
            href="/login"
            onClick={closeMenu}
          >
            {formatMessage({ id: "navbar.login" })}
          </Link>
        </>
      ) : (
        <>
          <div className="group relative flex items-center">
            <Link
              href={`/dashboard/${user.id}`}
              className="text-blue-500 transition duration-300 dark:text-white"
              onClick={closeMenu}
            >
              <FaEdit size={24} />
              <span className="hidden group-hover:block absolute dark:text-black dark:bg-white bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-1">
                {formatMessage({ id: "navbar.dashboard" })}
              </span>
            </Link>
          </div>
          <div className="group relative flex items-center">
            <button
              onClick={handleOpen}
              className="text-blue-500 transition duration-300 dark:text-white"
            >
              <FaShoppingCart size={24} />
              <span className="hidden group-hover:block absolute dark:text-black dark:bg-white bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-1">
                {formatMessage({ id: "navbar.addToCart" })}
              </span>
            </button>
          </div>
          <div className="group relative flex items-center">
            <Link
              href="/product/create"
              className="text-blue-500 transition duration-300 dark:text-white"
              onClick={closeMenu}
            >
              <FaPlus size={24} />
              <span className="hidden group-hover:block absolute dark:bg-white dark:text-black bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-1">
                {formatMessage({ id: "navbar.createProduct" })}
              </span>
            </Link>
          </div>
          <button
            className="bg-transparent rounded-md border text-blue-500 border-yellow-400 ps-4 pe-4 py-2 transition duration-300 hover:bg-yellow-400 hover:text-black"
            onClick={onSubmit}
          >
            {formatMessage({ id: "navbar.logout" })}
          </button>
        </>
      )}
    </>
  );
};

export default UserMenu;
