import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Cryptocurrency } from "../types/crypto";

interface FavoriteContextType {
  favorites: Cryptocurrency[];
  addToFavorites: (item: Cryptocurrency) => void;
  removeFromFavorites: (id: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavoriteContext must be used within a FavoriteProvider"
    );
  }
  return context;
};

const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<Cryptocurrency[]>(
    "favoriteCryptos",
    []
  );

  const addToFavorites = (item: Cryptocurrency) => {
    if (!favorites.some((crypto) => crypto.id === item.id)) {
      setFavorites([...favorites, item]);
    }
    console.log(favorites);
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((crypto) => crypto.id !== id);
    setFavorites(updatedFavorites);
  };

  const contextValue = useMemo(() => {
    return { favorites, addToFavorites, removeFromFavorites };
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
