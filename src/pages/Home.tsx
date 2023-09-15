import React from "react";
import CryptoList from "../components/CryptoList";
import Search from "../components/Search";
import FavoriteList from "../components/FavoriteList";

const Home = () => {
  return (
    <>
      <FavoriteList />
      <Search />
      <CryptoList />
    </>
  );
};

export default Home;
