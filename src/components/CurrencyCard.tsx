import React from "react";
import useFetch from "../hooks/useFetch";
import { SearchCurrency } from "../types/crypto";
import Loader from "./Loader";

interface IProps {
  crypto: string;
  isActive: boolean;
  onChange: () => void;
}

const CurrencyCard: React.FC<IProps> = ({ crypto, isActive, onChange }) => {
  const { data, isLoading } = useFetch<SearchCurrency>({
    url: `coins/${crypto}`,
  });
  return (
    <div
      className={`bg-[#313c7c] rounded-md py-3 px-5 flex flex-col justify-center items-center gap-2 cursor-pointer  font-medium hover:bg-[#374387] transition-colors duration-200 ${
        isActive ? " bg-green-500 hover:bg-green-400" : ""
      }`}
      onClick={onChange}
    >
      {isLoading && !data ? (
        <Loader />
      ) : (
        <>
          <p className="text-2xl">{data?.name}</p>
          <img
            src={data?.image.large}
            alt={data?.name}
            width={80}
            height={80}
            loading="lazy"
          />
          <p className="text-lg">{data?.symbol.toLocaleUpperCase()}</p>
        </>
      )}
    </div>
  );
};

export default CurrencyCard;
