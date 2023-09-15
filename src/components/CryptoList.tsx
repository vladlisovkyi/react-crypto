import React from "react";
import { useCryptoContext } from "../context/CryptoContext";
import CryptoCard from "./CryptoCard";
import { useFavoriteContext } from "../context/FavoriteContext";

const CryptoList = () => {
  const { cryptoData } = useCryptoContext();
  const { addToFavorites } = useFavoriteContext();
  return (
    <>
      <section className="grid gap-5  grid-cols-1 xs:grid-cols-2  sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-5">
        {cryptoData?.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            addToFavorites={() => addToFavorites(crypto)}
          />
        ))}
      </section>
    </>
  );
};

export default CryptoList;
