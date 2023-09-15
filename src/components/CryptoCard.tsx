import React from "react";
import { Cryptocurrency } from "../types/crypto";

interface IProps {
  crypto: Cryptocurrency;
  deleteCard?: () => void;
  addToFavorites?: () => void;
}

const CryptoCard = ({ crypto, deleteCard, addToFavorites }: IProps) => {
  const handleCardClick = addToFavorites || deleteCard;

  return (
    <div
      className="bg-[#313c7c] rounded-md py-3 px-5 flex flex-col items-center gap-2 cursor-pointer font-medium hover:bg-[#374387] transition-colors duration-200"
      onClick={handleCardClick}
    >
      <p className="text-2xl">{crypto.name}</p>
      <img
        src={crypto.image}
        alt={crypto.name}
        width={80}
        height={80}
        loading="lazy"
      />
      <p className="text-lg">{crypto.current_price.toFixed(2)}$</p>
      <p className="text-sm">
        <span className="text-xs mr-1">Price changed in 24h: </span>
        <span
          className={`${
            crypto.price_change_24h > 0 ? "text-green-300" : "text-red-400"
          }`}
        >
          {crypto.price_change_24h.toFixed(2)}$
        </span>
      </p>
      <p className="text-sm">
        <span className="text-xs mr-1">Price changed % : </span>{" "}
        <span
          className={`${
            crypto.price_change_percentage_24h > 0
              ? "text-green-300"
              : "text-red-400"
          }`}
        >
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
    </div>
  );
};

export default CryptoCard;
