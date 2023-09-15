import React from "react";
import CryptoCard from "./CryptoCard";
import { useFavoriteContext } from "../context/FavoriteContext";

const FavoriteList = () => {
  const { favorites, removeFromFavorites } = useFavoriteContext();

  return (
    <>
      <h3 className="pt-16 pb-5 text-center text-3xl font-medium">
        Here's a list of your favorite crypto:
      </h3>
      {favorites.length ? (
        <section className="grid gap-5  grid-cols-1 xs:grid-cols-2  sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-5">
          {favorites.map((fav) => (
            <CryptoCard
              key={fav.id}
              crypto={fav}
              deleteCard={() => removeFromFavorites(fav.id)}
            />
          ))}
        </section>
      ) : (
        <p className="text-center text-gray-300">No favorites yet...</p>
      )}
    </>
  );
};

export default FavoriteList;
