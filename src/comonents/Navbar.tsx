import { logOut } from "@/firebase/authentication";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "rsuite";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const logout = () => {
    logOut();
    router.push("/sign-in");
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-prmColor text-terColor p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" onClick={closeNav}>
            net solutions
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="hover:text-lg hover:font-semibold"
            onClick={closeNav}
          >
            Home
          </Link>
          <Link
            href="addEmployee"
            className="hover:text-lg hover:font-semibold"
            onClick={closeNav}
          >
            Add Employee
          </Link>
          <Link
            href="employeeList"
            className="hover:text-lg hover:font-semibold"
            onClick={closeNav}
          >
            Employee List
          </Link>
          <Button
            appearance="ghost"
            color="red"
            className=" flex items-center"
            onClick={() => {
              closeNav();
              logout();
            }}
          >
            <FiLogOut className="mr-1" />
            Logout
          </Button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleNav}>
            {navOpen ? (
              <FaTimes className="h-6 w-6 text-terColor" />
            ) : (
              <FaBars className="h-6 w-6 text-terColor" />
            )}
          </button>
        </div>
      </div>
      {navOpen && (
        <div className="md:hidden bg-prmColor space-y-4 p-4">
          <Link
            href=""
            className="block hover:text-lg hover:font-semibold"
            onClick={closeNav}
          >
            Home
          </Link>
          <Link
            href="addEmployee"
            className="block hover:text-lg hover:font-semibold"
            onClick={closeNav}
          >
            Add Employee
          </Link>
          <Link
            href="employeeList"
            className="block hover:text-lg hover:font-semibold"
            onClick={closeNav}
          >
            Employee List
          </Link>
          <Button
           appearance="ghost" color="red"
            className="block flex items-center"
            onClick={() => {
                closeNav();
                logout();
              }}
          >
            <FiLogOut className="mr-1" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
