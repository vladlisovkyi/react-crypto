import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="w-full h-20 sticky top-0 bg-[#100e4a] px-8 flex justify-between items-center ">
      <Link to={"/"} className="text-2xl font-bold">
        CryptoDash
      </Link>
      <Link to={"/dashboard"} className="text-lg hover:underline underline-offset-8">Dashboard</Link>
    </header>
  );
};

export default Header;
