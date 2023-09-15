import React, { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { Cryptocurrency } from "../types/crypto";
import { useCryptoContext } from "../context/CryptoContext";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounced = useDebounce(searchQuery, 700);
  const { initialCryptoData, setCryptoData } = useCryptoContext();
  const { data, isLoading, error } = useFetch<Cryptocurrency[]>({
    url: `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250`,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterCryptos = (cryptoData: Cryptocurrency[], query: string) => {
    return cryptoData.filter(
      (crypto: Cryptocurrency) =>
        crypto.name.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (!data) return;
    if (debounced) {
      const filteredData = filterCryptos(data, debounced);
      setCryptoData(filteredData);
    } else {
      setCryptoData(initialCryptoData || []);
    }
  }, [data, debounced]);

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <h3 className="pt-16 pb-5 text-center text-3xl font-medium">
        Search for a specific crypto
      </h3>

      <form className="pb-12 py-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search for a crypto..."
          className="w-full px-8 py-2 text-lg outline-none bg-transparent border border-[#b8b8b8] rounded-lg focus:border-[#b3edff] transition-all duration-200 "
        />
      </form>
      {error ? <p className="text-sm text-red-500">{error.message}</p> : null}
    </>
  );
};

export default Search;
